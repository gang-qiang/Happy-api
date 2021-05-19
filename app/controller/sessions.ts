import { SelfController, Get } from '@app/decorators/router'
import Controller from '../base/BaseController'

// 定义创建接口的请求参数规则
const findRule = {
  pageNo: 'isNumber?',
  pageSize: 'isNumber?',
  env: 'isEnv?',
}

/**
* @controller SessionsController
*/
@SelfController('/sessions')
export default class SessionsController extends Controller {
  /**
  * @summary 查询session列表
  * @description 根据条件查询session列表
  * @router get /api/v1/sessions
  * @request header string Authorization eg:Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request query string phone 手机号 模糊查询
  * @request query string env 环境 模糊查询
  * @response 200 querySessionResponse session列表
  *
  */
  @Get('/')
  async index () {
    const { ctx, app } = this
    ctx.validate(findRule, ctx.query)
    const defaultEnv = app.config.env === 'test' ? 'm' : 'online' // 设置环境默认key
    const { env = defaultEnv, phone, pageNo, pageSize } = ctx.query || {}
    const result = await ctx.service.sessions.findSession(env, phone, pageNo, pageSize)
    this.success({ ...result })
  }
}
