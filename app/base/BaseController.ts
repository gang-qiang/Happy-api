import { Controller } from 'egg'

export interface Result {
  [propName: string]: any
}
export interface SuccessData {
  data?: Result | Array<any>
  msg?: string
  pageSize?: number
  pageNo?: number
  total?: any
}
export default class BaseController extends Controller {
  get user () {
    return this.ctx.session.user
  }

  success (obj?: SuccessData) {
    const { msg, data, pageNo, pageSize, total } = obj || {}
    this.ctx.body = {
      msg: msg || 'OK',
      code: 200,
      data,
      pageSize,
      pageNo,
      total,
    }
  }

  errMsg (msg?: string, code?: string) {
    this.ctx.body = {
      msg: msg || 'not found',
      code: code || 400,
    }
  }
}
