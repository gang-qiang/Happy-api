import { generateToken } from '@app/utils/utils'
import { SelfController, Get, Post, Put, Delete } from '@app/decorators/router'
import Controller from '../base/BaseController'

// 定义创建接口的请求参数规则
const findRule = {
  pageNo: 'isNumber?',
  pageSize: 'isNumber?',
}
const createRule = {
  username: 'username',
  password: 'password',
  description: 'description',
}
const loginRule = {
  username: 'username',
  password: 'password',
}

const updateRule = {
  password: 'password?',
  description: 'description?',
}

/**
* @controller UsersController
*/
@SelfController('/users')
export default class UsersController extends Controller {
  /**
  * @summary 查询用户列表
  * @description 根据条件查询用户列表
  * @router get /api/v1/users
  * @request header string Authorization eg:Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request query string username 用户名 模糊查询
  * @response 200 queryUserResponse 用户信息
  *
  */
  @Get('/')
  async index () {
    const { ctx } = this
    ctx.validate(findRule, ctx.query)
    const result = await ctx.service.users.findAllUsers(ctx.query)
    this.success({ data: result })
  }

  /**
   * @summary 获取用户信息
   * @description 根据ID获取用户信息
   * @router get /api/v1/users/{id}
   * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
   * @request path string *id 用户ID
   * @response 200 getUserResponse 用户信息
   */
  @Get('/:id')
  async show () {
    const { ctx } = this
    const result = await ctx.service.users.findUserById(ctx.params)
    this.success({ data: result })
  }

  /**
  * @summary 注册用户
  * @description 注册用户
  * @router post /api/v1/users/register
  * @request body creatUserRequest *body
  * @response 200 getUserResponse 生成的用户
  */
  @Post('/register')
  async register () {
    const { ctx } = this
    ctx.validate(createRule)
    const result = await ctx.service.users.create(ctx.request.body)
    this.success({ data: result })
  }

  /**
  * @summary 登录
  * @description 用户登录
  * @router post /api/v1/users/login
  * @request body loginUserRequest *body
  * @response 200 loginUserResponse token信息
  */
  @Post('/login')
  async login () {
    const { ctx } = this
    ctx.validate(loginRule)
    const result = await ctx.service.users.verifyNickNamePassword(ctx.request.body)
    const { id } = result
    const token = generateToken({ id })
    this.success({ data: { token, id } })
  }

  /**
  * @summary 修改用户信息
  * @description 修改用户密码/描述
  * @router put /api/v1/users/{id}
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request path string *id 用户ID
  * @request body updateUserRequest *body
  * @response 200 getUserResponse 修改成功的用户信息
  */
  @Put('/:id')
  async update () {
    const { ctx } = this
    ctx.validate(updateRule)
    const { id } = ctx.params
    const result = await ctx.service.users.update({ ...ctx.request.body, id })
    this.success({ data: result })
  }

  /**
  * @summary 删除用户
  * @description 根据id删除用户
  * @request header string Authorization eg: Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @router delete /api/v1/users/{id}
  * @request path string *id 用户ID
  */
  @Delete('/:id')
  async delete () {
    const { ctx } = this
    const { id } = ctx.params
    await ctx.service.users.delete(id)
    this.success({ msg: '删除成功' })
  }
}
