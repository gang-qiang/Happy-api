import { Service } from 'egg'
import * as moment from 'moment-timezone'
import { subtract } from '@mhc/mhc-helper'
import { get } from '../utils/request'
import common from '../utils/common'

const PROD_OBJ = {
  origin: common.ONLINE_ES_HOST,
  elsIndex: common.ONLINE_ELS_INDEX,
  monitoringUrl: common.ONLINE_WEB_ERR_DETAIL_URL,
}

const TEST_OBJ = {
  origin: common.TEST_ES_HOST,
  elsIndex: common.ELS_INDEX,
  monitoringUrl: common.WEB_ERR_DETAIL_URL,
}

type InitParams = typeof PROD_OBJ | typeof TEST_OBJ
export default class AbnormalService extends Service {
  origin: string

  elsIndex: string

  monitoringUrl: string

  constructor (ctx) {
    super(ctx)
    const obj: InitParams = this.config?.env === 'prod' ? PROD_OBJ : TEST_OBJ
    for (let key in obj) {
      this[key] = obj[key]
    }
  }

  /**
   * 告警当前错误等级
   * @param level
   */
  async warningError (levelConfig, errorType, product, id) {
    const { typeCode, type, typeDesc } = errorType || {}
    const errLevel = levelConfig?.find?.(item => Number(item?.typeCode) === Number(typeCode))
    switch (Number(errLevel?.levelCode)) {
      case common.ERROR_LEVEL.WARNING:
        {
          const content = `*********报错了*********
      项目：${product.name}
      错误类型：${type}-${typeDesc}
      详细地址：${this.monitoringUrl}?id=${id}
    `
          // 发送企业微信群通知
          this.service.notice.sendQYWeChat(content, [
            product?.user?.phoneNum || '@all',
          ])
          // 发送邮件提醒
          this.service.notice.sendMail(
            product?.user?.email,
            '项目报错通知',
            content
          )
        }
        break
      default:
    }
  }

  /**
   * 创建异常
   * @param body
   */
  async create (body: CreateReportParams) {
    const { app, ctx, elsIndex } = this
    const { exceptions = [], ...p } = body || {}
    const param: any = { ...p }
    const INDEX = { index: { _index: elsIndex, _type: 'doc' } }
    const params: any[] = []
    const products = await ctx.service.products.findAll()
    const product = products.filter(
      pro => `${pro.id}` === `${param.projectId}`
    )?.[0]
    const { name: projectName, levelConfig = [] } = product || {}
    const errTypes: any[] = []
    exceptions.forEach(exc => {
      params.push(INDEX)
      const { type } = exc
      const typeCode = common.ERROR_TYPE[type] || common.ERROR_TYPE.Error
      const typeDesc = common.ERROR_TYPE.match(typeCode)
      errTypes.push({ type, typeCode, typeDesc })
      params.push({
        ...param,
        projectName,
        exception: {
          ...exc,
          type: common.ERROR_TYPE[typeCode],
          typeCode,
          typeDesc,
        },
        creatTime: moment().tz(common.TIME_ZONE).format(common.TIME_FORMAT),
      })
    })
    const result = await app.elasticsearch.bulk({
      body: params,
    })
    // 错误通知
    result?.items?.forEach?.((res, index) => {
      this.warningError(
        levelConfig,
        errTypes?.[index],
        product,
        res?.index?._id
      )
    })
    return result
  }

  /**
   * 修改
   * @param id
   * @param body
   */

  async edit (id: string, body: ReportParams) {
    const { app, elsIndex } = this
    try {
      const result = await app.elasticsearch.bulk({
        body: [
          { update: { _index: elsIndex, _id: id, _type: 'doc' } },
          { doc: body },
        ],
      })
      return result
    } catch (e) {
      throw new Error(`${e}`)
    }
  }

  /**
   * 查询
   * @param body
   */
  async findAll (body) {
    const { app, elsIndex } = this
    const {
      pageNo,
      pageSize,
      type,
      projectId,
      creatStartTime,
      creatEndTime,
    } = body
    const _page = pageNo ? Number(pageNo) : common.pageNo
    const _limit = pageSize ? Number(pageSize) : common.pageSize

    let query: object
    if (!type && !projectId && !creatStartTime && !creatEndTime) {
      query = {
        match_all: {},
      }
    } else {
      const must: any = []
      let range: any
      // 根据错误类型查询
      if (type) {
        must.push({
          match: {
            'exception.type': common.ERROR_TYPE[type] || '',
          },
        })
      }
      // 根据项目查询
      if (projectId) {
        must.push({
          match: {
            projectId: projectId || '',
          },
        })
      }
      // 根据创建时间查询
      if (creatStartTime && creatEndTime) {
        range = {
          creatTime: {
            gte: creatStartTime,
            lte: creatEndTime,
          },
        }
      }
      query = {
        bool: {
          must,
          filter: {
            range,
          },
        },
      }
    }
    const result: IEsResult<any> = await app.elasticsearch.search({
      index: elsIndex,
      body: {
        _source: ['projectName', 'creatTime', 'exception'],
        query,
        from: (_page - 1) * _limit,
        size: _limit,
      },
      sort: 'creatTime:desc',
    })
    const response = {
      data: result?.hits?.hits || [],
      pageSize: _limit,
      pageNo: _page,
      total: result?.hits?.total,
    }
    return response
  }

  /**
   * 根据ID查询
   * @param id
   */
  async findById (id) {
    const { elsIndex, origin } = this
    const res = await get(`${origin}/${elsIndex}/doc/${id}`)
    return res?.data
  }

  /**
   * 清洗数据的工具方法
   */
  async washData () {
    const { app, elsIndex } = this
    const result = await app.elasticsearch.search({
      index: elsIndex,
      body: {
        query: {
          match_all: {},
        },
        from: 0,
        size: 1000,
      },
      sort: 'creatTime:desc',
    })

    const res = result.hits?.hits.map(item => {
      const { type } = item._source.exception
      item._source.exception = {
        ...item._source.exception,
        typeCode: common.ERROR_TYPE[type] || '',
        typeDesc: common.ERROR_TYPE.match(common.ERROR_TYPE[type]) || '',
      }
      return item
    })
    const params: any = []
    for (let i = 0; i < res.length; i++) {
      params.push(
        { update: { _index: elsIndex, _type: 'doc', _id: res[i]._id } },
        { doc: res[i]._source }
      )
    }
    await app.elasticsearch.bulk({
      body: params,
    })
  }

  /**
   * 统计今日/昨日异常次数信息
   */
  async statisticalTodayYesterday () {
    const { app, elsIndex } = this

    // 获取时间维度
    const time = moment().tz(common.TIME_ZONE)
    const today = time.format('YYYY-MM-DD')
    const yesterday = time.add(-1, 'days').format('YYYY-MM-DD')

    // 范围限定
    const query = {
      range: {
        creatTime: {
          gte: `${yesterday} 00:00:00`,
          lte: `${today} 23:59:59`,
        },
      },
    }

    // 聚合条件
    const aggs = {
      num: {
        date_histogram: {
          field: 'creatTime',
          interval: 'day',
          format: 'yyyy-MM-dd',
          min_doc_count: 0,
          extended_bounds: {
            min: yesterday,
            max: today,
          },
        },
      },
    }

    try {
      // 查询
      const result: IEsResult<any> = await app.elasticsearch.search({
        index: elsIndex,
        body: { size: 0, query, aggs },
      })

      const {
        num: { buckets = [] },
      } = result?.aggregations || {}
      const [yesterdayData = {}, todayData = {}] = buckets
      return {
        num: todayData?.doc_count,
        moreThanYesterday: subtract(
          todayData?.doc_count,
          yesterdayData?.doc_count
        ),
      }
    } catch (e) {
      throw new Error(`${e}`)
    }
  }

  /**
   * 根据查询条件 单一聚合查询
   * 根据查询条件，聚合查询关键词，统计关键词对应的数量
   * @param body 时间范围
   * @param key 聚合查询关键词
   */
  async singleStatisticalByParams (
    body: StatisticsTimeByTypeAndProject,
    key: string
  ) {
    const { app, elsIndex } = this
    const { type, projectId, startTime, endTime } = body
    const must: any = []

    // 根据错误类型查询
    if (type) {
      must.push({
        match: { 'exception.type': common.ERROR_TYPE[type] || '' },
      })
    }
    // 根据项目查询
    if (projectId) {
      must.push({
        match: { projectId: projectId || '' },
      })
    }

    const range = {
      creatTime: { gte: startTime, lte: endTime },
    }
    // 范围查询条件
    const query = {
      bool: { must, filter: { range } },
    }

    // 聚合条件
    const aggs = {
      currentKey: {
        terms: {
          field: key,
        },
      },
    }
    try {
      // 查询
      const result: IEsResult<any> = await app.elasticsearch.search({
        index: elsIndex,
        body: { size: 0, query, aggs },
      })

      const {
        currentKey: { buckets = [] },
      } = result?.aggregations || {}
      return buckets
    } catch (e) {
      throw new Error(`${e}`)
    }
  }

  /**
   * 根据时间范围，错误类型，产品ID ，时间聚合统计查询
   * @param body
   * @returns
   */
  async statisticalTimeByTypeAndProject (body: StatisticsTimeByTypeAndProject) {
    const { app, elsIndex } = this
    const { type, projectId, startTime, endTime } = body
    const must: any = []
    // 根据错误类型查询
    if (type) {
      must.push({
        match: { 'exception.type': common.ERROR_TYPE[type] || '' },
      })
    }
    // 根据项目查询
    if (projectId) {
      must.push({
        match: { projectId: projectId || '' },
      })
    }

    const range = {
      creatTime: { gte: startTime, lte: endTime },
    }
    // 范围查询条件
    const query = {
      bool: { must, filter: { range } },
    }

    // 聚合条件
    const aggs = {
      num: {
        date_histogram: {
          field: 'creatTime',
          interval: 'day',
          format: 'yyyy-MM-dd',
          min_doc_count: 0,
          extended_bounds: {
            min: startTime.split(' ')[0],
            max: endTime.split(' ')[0],
          },
        },
      },
    }

    try {
      // 查询
      const result: IEsResult<any> = await app.elasticsearch.search({
        index: elsIndex,
        body: { size: 0, query, aggs },
      })

      const {
        num: { buckets = [] },
      } = result?.aggregations || {}
      const data: any = {
        date: [],
        number: [],
      }
      buckets.forEach(bucket => {
        data.date.push(bucket.key_as_string)
        data.number.push(bucket.doc_count)
      })
      return data
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
}

export interface ReportSdk {
  name: string; // sdk 名称
  version: string; // sdk 版本名
}

export interface ReportException {
  projectId: any
  type: string; // 错误类型，上面取
  message: string; // 错误信息
  stack: string; // 错误栈
}
export interface ReportRequest {
  url: string; // location.href
  userAgent: string; // 用户代理信息
}

export interface CreateReportParams {
  sdk: ReportSdk; // sdk 信息
  // platform: ReportPlatform
  exceptions: ReportException[]; // 错误信息
  request: ReportRequest; // 请求方信息
  productId: string; // 请求方产品ID
}

export interface ReportParams {
  sdk: ReportSdk; // sdk 信息
  // platform: ReportPlatform
  exception: ReportException; // 错误信息
  request: ReportRequest; // 请求方信息
  productId: string; // 请求方产品ID
}

export interface IEsResult<T> {
  /**
   * 耗时，毫秒
   */
  took: number
  timed_out: boolean
  /**
   * 结果数据
   */
  hits: {
    /**
     * 结果集合
     */
    hits: T[]
    /**
     * 计数
     */
    total: {
      /**
       * 关系
       */
      relation: 'eq'
      /**
       * 一共多少数据
       */
      value: number
    }
  }
  /**
   * 单页大小
   */
  size?: number
  /**
   * 总页数
   */
  total?: number
  /**
   * 聚合查询
   */
  aggregations?: any
}

export interface StatisticsTimeRequest {
  startTime: string; // 开始时间
  endTime: string; // 结束时间
}

export interface StatisticsTimeByTypeAndProject extends StatisticsTimeRequest {
  projectId?: number
  type?: string
}
