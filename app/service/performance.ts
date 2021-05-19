import { Service } from 'egg'
import * as moment from 'moment-timezone'
import common from '../utils/common'

export interface ReportSdk {
  name: string // sdk 名称
  version: string // sdk 版本名
}

export interface ReportData {
  projectId: any
  type: string
}

export interface ReportRequest {
  url: string // location.href
  userAgent: string // 用户代理信息
}

export interface CreateReportParams {
  sdk: ReportSdk // sdk 信息
  // platform: ReportPlatform
  data: ReportData // 性能信息
  request: ReportRequest // 请求方信息
  productId: string // 请求方产品ID
}

export interface QueryStatsParams {
  id: string
  startTime: string
  endTime: string
  type: string
}

export default class PerformanceService extends Service {
  origin: string

  perfIndex: string

  constructor (ctx) {
    super(ctx)
    this.origin = this.config?.env === 'prod' ? common.ONLINE_ES_HOST : common.TEST_ES_HOST
    this.perfIndex = this.config?.env === 'prod' ? common.ONLINE_PERF_INDEX : common.PERF_INDEX
  }

  async create (body: CreateReportParams) {
    const { app, ctx, perfIndex } = this
    const { data, ...rest } = body || {}
    const INDEX = {
      index: {
        _index: perfIndex,
        _type: 'doc',
      }
    }
    const paramRest: any = { ...rest }
    const products = await ctx.service.products.findAll()
    const projectName = products.filter(product => (
      `${product.id}` === `${paramRest.projectId}`
    ))?.[0]?.name
    const params: any = {
      ...paramRest,
      userAgent: ctx.req.headers['user-agent'],
      projectName,
      perfData: data,
      createTime: moment().tz(common.TIME_ZONE).format(common.TIME_FORMAT),
    }
    const result = await app.elasticsearch.bulk({
      body: [INDEX, params],
    })

    return result
  }

  /**
   * 查询项目性能数据统计
   * @param body
   */
  async queryStatsByParams (body: QueryStatsParams) {
    const { app, perfIndex } = this
    const { id, type, startTime, endTime } = body

    const keywordTime = 'createTime.keyword'
    const must: any = [
      {
        match: { projectId: id },
      }
    ]
    const range = {
      'createTime.keyword': { gte: startTime, lte: endTime },
    }
    const query = {
      bool: { must, filter: { range } },
    }

    const field = `perfData.${type}`

    const statsData = {
      terms: { field: keywordTime },
      aggs: {
        max_num: { max: { field } },
        min_num: { min: { field } },
        avg_num: { avg: { field } },
      }
    }

    const result = await app.elasticsearch.search({
      index: perfIndex,
      body: {
        query,
        size: 0,
        aggs: { statsData }
      }
    })
    const { buckets } = result?.aggregations?.statsData || {}
    const response = {
      data: buckets?.map(item => ({
        time: item.key,
        max: item.max_num?.value,
        min: item.min_num?.value,
        avg: item.avg_num?.value,
      }))
    }
    return response
  }

  /**
   * 查询有性能数据的项目列表
   */
  async findProducts () {
    const { app, perfIndex } = this

    const result = await app.elasticsearch.search({
      index: perfIndex,
      body: {
        _source: ['projectId', 'projectName'],
        collapse: {
          field: 'projectId.keyword'
        }
      },
    })

    const response = {
      data: result?.hits?.hits?.map(item => item._source) || [],
    }
    return response
  }
}
