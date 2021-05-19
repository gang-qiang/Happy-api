import { SelfController, Post, Get } from '@app/decorators/router'
import Controller from '../base/BaseController'

// 自定义校验规则
const uploadRule1 = {
  files: 'array',
}

const uploadRule2 = {
  dir: 'string',
  nameType: 'string',
}

/**
* @controller filesController
*/
@SelfController('/files')
export default class filesController extends Controller {
  /**
  * @summary 查询符合条件的文件列表
  * @description 询符合条件的文件列表
  * @router get /api/v1/files
  * @request header string Authorization eg:Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request body string prefix 文件前缀
  * @response 200 filesResponse 上传的文件信息数组
  *
  */
  @Get('/')
  async index () {
    const { ctx } = this
    const result = await ctx.service.files.queryFiles(ctx.query)
    this.success({ ...result })
  }

  /**
  * @summary 获取上传七牛云的token
  * @description 获取上传七牛云的token
  * @router get /api/v1/files/token
  * @request header string Authorization eg:Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @response 200 qiniuTokenResponse 七牛token
  *
  */
  @Get('/token')
  async token () {
    const { ctx } = this
    const token = await ctx.service.files.getToken()
    this.success({ data: token })
  }

  /**
  * @summary 上传文件到七牛云
  * @description 上传文件到七牛云
  * @router post /api/v1/files/upload
  * @request header string Authorization eg:Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbl 登录校验token
  * @request formData file files 文件数组
  * @request body string dir 上传目录
  * @request body string nameType 文件命名规则
  * @response 200 uploadResponse 上传的文件信息数组
  *
  */
  @Post('/upload')
  async upload () {
    const { ctx } = this
    ctx.validate(uploadRule1, ctx.request)
    ctx.validate(uploadRule2, ctx.request.body)

    let fileList: Array <Object> = []
    try {
      fileList = await ctx.service.files.uploadFiles(ctx.request)
    } catch (error) {
      console.log('文件上传到七牛异常', error)
      throw error
    }
    ctx.cleanupRequestFiles() // 清除本地缓存文件
    this.success({ data: fileList })
  }
}
