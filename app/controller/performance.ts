import Controller from '@app/base/BaseController'
import { SelfController, Get, Post } from '@app/decorators/router'
import common from '@app/utils/common'

// 定义创建接口的请求参数规则
// const findRule = {
//   pageNo: 'isNumber?',
//   pageSize: 'isNumber?',
// }
const perfBodyRule = {
  perfBody: 'jsonString',
}
const createRule = {
  sdk: 'sdk',
  data: 'perfData',
}

@SelfController('/performance')
export default class PerfController extends Controller {
  /**
  * @summary 查询项目列表
  * @description 查询项目列表
  * @router get /api/v1/performance/products
  * @response 200 queryProductsResponse 性能信息
  */
  @Get('/products')
  async index () {
    const { ctx } = this
    const result = await ctx.service.performance.findProducts()
    this.success({ ...result })
  }

  /**
   * @summary 查询性能类型
   * @description 查询性能类型
   * @router get /api/v1/performance/type
   * @response 200 queryPerfTypeResponse 性能类型信息
   */
  @Get('/type')
  getType () {
    const perfMap = common.PERF_TYPE.match()
    const data = Object.entries(perfMap).map(item => ({ value: item[0], text: item[1] }))
    this.success({ data })
  }

  /**
   * @summary 查询具体项目的某个性能类型数据
   * @description 查询性能数据
   * @router get /api/v1/performance/queryStats/:id/:type
   * @request query string startTime 开始时间
   * @request query string endTime   结束时间
   * @response 200 queryPerfStatsResponse 性能数据
   */
  @Get('/queryStats/:id/:type')
  async queryStats () {
    const { ctx } = this
    const { id, type } = ctx.params
    const { endTime, startTime } = ctx.query
    const result = await ctx.service.performance.queryStatsByParams({
      id,
      type,
      startTime,
      endTime,
    })
    this.success({ ...result })
  }

  /**
   * @summary 新增性能数据
   * @description 新增性能数据
   * @router post /api/v1/performance
   * @request header string Content-Type must is text/plain;charset=UTF-8
   * @request header string Sec-Fetch-Mode better is no-cors
   * @request body perf *body JSON String
   * @response 200 baseResponse
   */
  @Post('/')
  async create () {
    const { ctx } = this
    ctx.validate(perfBodyRule, { perfBody: ctx.request.body })
    const perfData = JSON.parse(ctx.request.body)
    ctx.validate(createRule, perfData)
    await ctx.service.performance.create(perfData)
    this.success()
  }
}
