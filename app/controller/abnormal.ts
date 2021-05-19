/* eslint-disable max-len */
import { SelfController, Get, Post, Put } from '@app/decorators/router'
import * as moment from 'moment-timezone'
import common from '@app/utils/common'
import Controller from '../base/BaseController'

// 定义创建接口的请求参数规则
const findRule = {
  pageNo: 'isNumber?',
  pageSize: 'isNumber?',
  type: 'abnormalType?',
  projectId: 'isNumber?',
  creatStartTime: 'dateTime?',
  creatEndTime: 'dateTime?'
}
const abnormalBodyRule = {
  abnormalBody: 'jsonString',
}
const createRule = {
  sdk: 'abSdk',
  exceptions: 'abExceptions',
  request: 'abRequest',
}
const updateRule = {
  sdk: 'abSdk',
  exception: 'abException',
  request: 'abRequest',
}

const timeStatisticRule = {
  startTime: 'dateTime',
  endTime: 'dateTime',
  type: 'abnormalType?',
  projectId: 'isNumber?',
}

/**
* @controller Abnormal
*/
@SelfController('/abnormal')
export default class AbnormalController extends Controller {
  /**
  * @summary 查询异常列表
  * @description 查询异常列表（分页）
  * @router get /api/v1/abnormal
  * @request query integer pageNo 页码 默认 1
  * @request query integer pageSize 单页数量 默认 10
  * @request query integer type eg:1:引用错误;2:语法错误;3:范围错误;4:类型错误;5:URI错误;6:eval 错误;7:promise 错误;8:资源加载异常;9:未知错误
  * @request query integer projectId 项目
  * @request query string creatStartTime 异常创建开始时间
  * @request query string creatEndTime 异常创建结束时间
  * @response 200 queryAbnormalResponse 异常信息
  */
  @Get('/')
  async index () {
    const { ctx } = this
    ctx.validate(findRule, ctx.query)
    const result = await ctx.service.abnormal.findAll(ctx.query)
    this.success({ ...result })
  }

  /**
  * @summary 统计今日数据
  * @description 统计今日数据
  * @router get /api/v1/abnormal/getTodayStatisticData
  * @response 200 queryAbnormalTodayStatisticResponse
  */
  @Get('/getTodayStatisticData')
  async getTodayStatisticData () {
    const { ctx } = this

    // 获取时间维度
    const time = moment().tz(common.TIME_ZONE).format('YYYY-MM-DD')
    const query = {
      startTime: `${time} 00:00:00`,
      endTime: `${time} 23:59:59`,
    }

    // 类型聚合查询关键词
    const aggTypeKey = 'exception.type.keyword'
    // 项目聚合查询关键词
    const aggProjectKey = 'projectId.keyword'

    // 查询今日/昨日异常次数
    const todayYesterdayPromise = ctx.service.abnormal.statisticalTodayYesterday()
    // 查询今日报错的错误类型数据
    const typePromise = ctx.service.abnormal.singleStatisticalByParams(query, aggTypeKey)
    // 查询今日报错的项目数据
    const projectPromise = ctx.service.abnormal.singleStatisticalByParams(query, aggProjectKey)

    const abnormalNumber = await todayYesterdayPromise
    const abnormalTypes = await typePromise
    const projectData = await projectPromise

    const projects = await ctx.service.products.findAll()

    const type = abnormalTypes?.[0]?.key
    const typeCode = common.ERROR_TYPE?.[type]
    const typeDesc = common.ERROR_TYPE.match(typeCode)

    const projectId = projectData?.[0]?.key
    const result = {
      abnormalNumber,
      abnormalType: {
        type,
        typeCode,
        typeDesc,
        number: abnormalTypes?.[0].doc_count
      },
      abnormalProject: {
        projectId,
        projectName: projects.find(pro => `${pro.id}` === projectId)?.name,
        number: projectData?.[0]?.doc_count,
      }
    }

    this.success({ data: result })
  }

  /**
  * @summary 查询条件范围内每天对应的报错数量
  * @description 根据 时间范围/错误类型/项目ID 筛选，按照时间聚合查询错误数量
  * @router get /api/v1/abnormal/getTimeStatisticData
  * @request query integer type eg:1:引用错误;2:语法错误;3:范围错误;4:类型错误;5:URI错误;6:eval 错误;7:promise 错误;8:资源加载异常;9:未知错误
  * @request query integer projectId 项目
  * @request query string startTime 异常创建开始时间
  * @request query string endTime 异常创建结束时间
  * @response 200 queryAbnormalTimeStatisticResponse
  */
  @Get('/getTimeStatisticData')
  async getTimeStatisticData () {
    const { ctx } = this
    ctx.validate(timeStatisticRule, ctx.query)
    const result = await ctx.service.abnormal.statisticalTimeByTypeAndProject(ctx.query)
    this.success({ data: result })
  }

  /**
  * @summary 查询条件范围内 每个错误类型对应的报错数量
  * @description 根据 时间范围/项目ID 筛选，按照错误类型聚合查询错误数量
  * @router get /api/v1/abnormal/getTypeStatisticData
  * @request query integer projectId 项目
  * @request query string startTime 异常创建开始时间
  * @request query string endTime 异常创建结束时间
  * @response 200 queryAbnormalTypeStatisticResponse
  */
  @Get('/getTypeStatisticData')
  async getTypeStatisticData () {
    const { ctx } = this
    ctx.validate(timeStatisticRule, ctx.query)
    const result = await ctx.service.abnormal.singleStatisticalByParams(ctx.query, 'exception.type.keyword')

    const data = result.map(item => {
      const type = item.key
      const typeCode = common.ERROR_TYPE?.[type]
      const typeDesc = common.ERROR_TYPE.match(typeCode)
      return {
        number: item.doc_count,
        type,
        typeCode,
        typeDesc
      }
    })
    this.success({ data })
  }

  /**
  * @summary 查询时间范围内 每个项目对应的报错数量
  * @description 根据 时间范围 筛选，按照项目聚合查询错误数量
  * @router get /api/v1/abnormal/getProjectStatisticData
  * @request query string startTime 异常创建开始时间
  * @request query string endTime 异常创建结束时间
  * @response 200 queryAbnormalProjectStatisticResponse
  */

  @Get('/getProjectStatisticData')
  async getProjectStatisticData () {
    const { ctx } = this
    ctx.validate(timeStatisticRule, ctx.query)
    const result = await ctx.service.abnormal.singleStatisticalByParams(ctx.query, 'projectId.keyword')
    const projects = await ctx.service.products.findAll()
    const data = result.map(item => {
      const projectId = item.key
      const projectName = projects.find(pro => `${pro.id}` === projectId)?.name
      return {
        projectId,
        projectName,
        number: item.doc_count,
      }
    })
    this.success({ data })
  }

  /**
  * @summary 获取异常类型
  * @description 获取异常类型
  * @router get /api/v1/abnormal/abnormalType
  * @response 200 baseResponse
  */
  @Get('/abnormalType')
  abnormalType () {
    this.success({
      data: common.ERROR_TYPE.match('', true),
    })
  }

  /**
  * @summary 获取异常等级
  * @description 获取异常等级
  * @router get /api/v1/abnormal/abnormalLevel
  * @response 200 baseResponse
  */
  @Get('/abnormalLevel')
  abnormalLevel () {
    const data = {}
    common.ERROR_LEVEL.forEach(([_, code, text]) => {
      data[code] = text
    })
    this.success({
      data,
    })
  }

  /**
  * @summary 查询异常详情
  * @description 查询异常详情
  * @router get /api/v1/abnormal/{id}
  * @response 200 abnormals 异常信息
  */
  @Get('/:id')
  async findById () {
    const { ctx } = this
    const { id } = ctx.params
    const result = await ctx.service.abnormal.findById(id)
    this.success({ data: result })
  }

  /**
  * @summary 新增异常
  * @description 新增异常
  * @router post /api/v1/abnormal
  * @request header string Content-Type must is text/plain;charset=UTF-8
  * @request header string Sec-Fetch-Mode better is no-cors
  * @request body abnormals *body JSON String
  * @response 200 baseResponse
  */
  @Post('/')
  async create () {
    const { ctx } = this
    // 校验是否是 json 字符串，所以就不 try catch 了
    ctx.validate(abnormalBodyRule, { abnormalBody: ctx.request.body })
    const abnormalData = JSON.parse(ctx.request.body)
    ctx.validate(createRule, abnormalData)
    await ctx.service.abnormal.create({...abnormalData, ip: ctx.request.ip})
    this.success()
  }

  /**
  * @summary 修改异常信息
  * @description 根据异常ID修改异常信息
  * @router put /api/v1/abnormal/{id}
  * @request body createAbnormalArrRequest *body
  * @response 200 baseResponse
  */
  @Put('/:id')
  async update () {
    const { ctx } = this
    ctx.validate(updateRule, ctx.request.body)
    const { id } = ctx.params
    await ctx.service.abnormal.edit(id, ctx.request.body)
    this.success()
  }
}
