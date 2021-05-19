import { SelfController, Get, Post, Put } from '@app/decorators/router'
import Controller from '../base/BaseController'

// 定义创建接口的请求参数规则
const findRule = {
  pageNo: 'isNumber?',
  pageSize: 'isNumber?',
}
const endProductBaseRule = {
  alias: 'string?',
  ownerName: 'string?',
  ownerId: 'isNumber?',
  gitUrl: 'string?',
  tecType: 'isNumber?',
  onlineUrl: 'string?',
  preUrl: 'string?',
  testUrl: 'string?',
  isJenkins: 'isNumber?',
}
const createRule = {
  name: 'productName',
  description: 'productDescription',
  ...endProductBaseRule,
}

const updateRule = {
  name: 'string?',
  description: 'string?',
  ...endProductBaseRule,
}
/**
* @controller EndProductController
*/
@SelfController('endProducts')
export default class EndProductController extends Controller {
  /**
  * @summary 查询后端项目列表
  * @description 查询后端项目列表（分页）
  * @router get /api/v1/endProducts
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request query integer pageNo 页码 默认 1
  * @request query integer pageSize 单页数量 默认 10
  * @request query string name 产品名 模糊查询
  * @response 200 queryEndProductResponse 产品信息
  */
  @Get('/')
  async index () {
    const { ctx } = this
    ctx.validate(findRule, ctx.query)
    const result = await ctx.service.endProducts.findAllEndProducts(ctx.query)
    this.success({ ...result })
  }

  /**
  * @summary 新增后端项目
  * @description 新增后端项目
  * @router post /api/v1/endProducts
  * @request body creatEndProductRequest *body
  * @response 200 endProduct 生成的产品
  */
  @Post('/')
  async create () {
    const { ctx } = this
    ctx.validate(createRule, ctx.request.body)
    const result = await ctx.service.endProducts.create(ctx.request.body)
    this.success({ data: result })
  }

  /**
  * @summary 更新后端项目信息
  * @description 更新后端项目信息
  * @router put /api/v1/endProducts/{id}
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request path string *id 项目ID
  * @request body creatEndProductRequest *body
  * @response 200 endProduct 修改成功的用户信息
  */
  @Put('/:id')
  async update () {
    const { ctx } = this
    ctx.validate(updateRule)
    const { id } = ctx.params
    const result = await ctx.service.endProducts.update(id, ctx.request.body)
    this.success({ data: result })
  }
}
