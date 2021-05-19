import { SelfController, Get, Post, Put } from '@app/decorators/router'
import Controller from '../base/BaseController'

// 定义创建接口的请求参数规则
const findRule = {
  pageNo: 'isNumber?',
  pageSize: 'isNumber?',
}
const demandBaseRule = {
  PRDUrl: 'string?',
  JIRAUrl: 'string?',
  UIUrl: 'string?',
  APLUrl: 'string?',
}
const createRule = {
  name: {
    type: 'string',
    required: true,
    max: 20,
    min: 3,
  },
  description: {
    type: 'string',
    required: true,
    max: 50,
    min: 5,
  },
}

const updateRule = {
  name: {
    type: 'string',
    required: false,
    max: 20,
    min: 5,
  },
  description: {
    type: 'string',
    required: false,
    max: 50,
    min: 5,
  },
  ...demandBaseRule,
}

const addProRule = {
  id: 'isNumber',
  frontIds: {
    type: 'array',
    itemType: 'isNumber',
    min: 1,
  },
}

const addUserRule = {
  id: 'isNumber',
  userIds: {
    type: 'array',
    itemType: 'isNumber',
    min: 1,
  },
}
/**
* @controller DemandController
*/
@SelfController('/demands')
export default class DemandController extends Controller {
  /**
  * @summary 查询需求列表
  * @description 查询需求列表（分页）
  * @router get /api/v1/demands
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request query integer pageNo 页码 默认 1
  * @request query integer pageSize 单页数量 默认 10
  * @request query string name 需求名 模糊查询
  * @response 200 queryDemandResponse 产品信息
  */
  @Get('/')
  async index () {
    const { ctx } = this
    ctx.validate(findRule, ctx.query)
    const result = await ctx.service.demands.findAllDemands(ctx.query)
    this.success({ ...result })
  }

  /**
  * @summary 新增需求
  * @description 新增需求
  * @router post /api/v1/demands
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request body creatDemandRequest *body
  * @response 200 demand 生成的需求
  */
  @Post('/')
  async create () {
    const { ctx } = this
    ctx.validate(createRule, ctx.request.body)
    const result = await ctx.service.demands.create(ctx.request.body)
    this.success({ data: result })
  }

  /**
  * @summary 更新需求信息
  * @description 更新需求信息
  * @router put /api/v1/demands/{id}
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request path string *id 需求ID
  * @request body creatDemandRequest *body
  * @response 200 demand 修改成功的需求信息
  */
  @Put('/:id')
  async update () {
    const { ctx } = this
    ctx.validate(updateRule)
    const { id } = ctx.params
    const result = await ctx.service.demands.update(id, ctx.request.body)
    this.success({ data: result })
  }

  /**
  * @summary 关联前端项目
  * @description 根据id关联前端项目
  * @router post /api/v1/demands/addProductRelate
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request body addProRelateRequest *body
  * @response 200 demand 产品信息
  */
  @Post('/addProductRelate')
  async addProductRelate () {
    const { ctx } = this
    ctx.validate(addProRule)
    const result = await ctx.service.demands.addProducts(ctx.request.body)
    this.success({ data: result })
  }

  /**
  * @summary 关联用户
  * @description 根据id关联用户
  * @router post /api/v1/demands/addUserRelate
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request body addUserRelateRequest *body
  * @response 200 demand 产品信息
  */
  @Post('/addUserRelate')
  async addUserRelate () {
    const { ctx } = this
    ctx.validate(addUserRule)
    const result = await ctx.service.demands.addUsers(ctx.request.body)
    this.success({ data: result })
  }
}
