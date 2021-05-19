import { SelfController, Get, Post, Put, Delete } from '@app/decorators/router'
import Controller from '../base/BaseController'

// 定义创建接口的请求参数规则
const findRule = {
  pageNo: 'isNumber?',
  pageSize: 'isNumber?',
}
const productBaseRule = {
  userId: 'isNumber?',
  gitUrl: 'string?',
  tecType: 'isNumber?',
  onlineUrl: 'string?',
  preUrl: 'string?',
  testUrl: 'string?',
  appType: 'isNumber?',
  appGroup: 'isNumber?',
  isJenkins: 'isNumber?',
  nodeVersion: 'string?',
}
const createRule = {
  name: 'productName',
  description: 'productDescription',
  levelConfig: 'jsonString?',
  ...productBaseRule,
}
const updateRule = {
  name: 'string?',
  description: 'string?',
  levelConfig: 'jsonString?',
  ...productBaseRule,
}
const addEndRule = {
  id: 'isNumber',
  endIds: {
    type: 'array',
    itemType: 'isNumber',
    min: 1,
  },
}

/**
* @controller ProductController
*/
@SelfController('/products')
export default class ProductController extends Controller {
  /**
  * @summary 查询产品列表
  * @description 查询产品列表（分页）
  * @router get /api/v1/products
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request query integer pageNo 页码 默认 1
  * @request query integer pageSize 单页数量 默认 10
  * @request query string name 产品名 模糊查询
  * @request query string userId 所有者ID
  * @response 200 queryProductResponse 产品信息
  */
  @Get('/')
  async index () {
    const { ctx } = this
    ctx.validate(findRule, ctx.query)
    const result = await ctx.service.products.findAllProducts(ctx.query)
    this.success({ ...result })
  }

  /**
  * @summary 查询所有产品列表
  * @description 查询所有产品列表
  * @router get /api/v1/products/findAll
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @response 200 queryAllProductResponse 产品信息
  */
  @Get('/findAll')
  async findAll () {
    const { ctx } = this
    const result = await ctx.service.products.findAll()
    this.success({ data: result })
  }

  /**
  * @summary 新增产品
  * @description 新增产品
  * @router post /api/v1/products
  * @request body creatProductRequest *body
  * @response 200 product 生成的产品
  */
  @Post('/')
  async create () {
    const { ctx } = this
    ctx.validate(createRule, ctx.request.body)
    const result = await ctx.service.products.create(ctx.request.body)
    this.success({ data: result })
  }

  /**
  * @summary 批量新增产品
  * @description 新增产品
  * @router post /api/v1/products/batchCreate
  * @request body creatProductRequest *body
  * @response 200 product 生成的产品
  */
  @Post('/batchCreate')
  async batchCreate () {
    const { ctx } = this
    // ctx.validate(createRule, ctx.request.body)
    const result = await ctx.service.products.batchCreate(ctx.request.body)
    this.success({ data: result })
  }

  /**
  * @summary 更新产品信息
  * @description 更新产品信息
  * @router put /api/v1/products/{id}
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request path string *id 产品ID
  * @request body creatProductRequest *body
  * @response 200 product 修改成功的产品信息
  */
  @Put('/:id')
  async update () {
    const { ctx } = this
    ctx.validate(updateRule)
    const { id } = ctx.params
    if (!`${id}`) {
      this.errMsg('请选择产品！')
      return
    }
    const result = await ctx.service.products.update(id, ctx.request.body)
    this.success({ data: result })
  }

  /**
  * @summary 关联后端项目
  * @description 根据id关联后端项目
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @router post /api/v1/products/addEndRelate
  * @request body addEndRelateRequest *body
  * @response 200 product 产品信息
  */
  @Post('/addEndRelate')
  async addEndRelate () {
    const { ctx } = this
    ctx.validate(addEndRule)
    const result = await ctx.service.products.addEndProducts(ctx.request.body)
    this.success({ data: result })
  }

  /**
  * @summary 删除前端项目
  * @description 根据id删除前端项目
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @router delete /api/v1/products/{id}
  * @request path string *id 产品ID
  */
  @Delete('/:id')
  async deleteProducts () {
    const { ctx } = this
    const { id } = ctx.params
    await ctx.service.products.delete(id)
    this.success({ msg: '删除成功' })
  }
}
