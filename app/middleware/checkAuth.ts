import * as basicAuth from 'basic-auth'
import * as jwt from 'jsonwebtoken'
import { Context } from 'egg'
import common from '../utils/common'

class TokenError extends Error {
  status: number

  message: string

  constructor (message = '错误', status = 450) {
    super()
    this.status = status
    this.message = message
  }
}

// JWT 令牌校验
export default function checkAuth () {
  return async (ctx: Context, next: () => Promise<any>) => {
    const userToken = basicAuth(ctx.req)
    let errMsg = 'token 不合法'
    if (!userToken || !userToken.name) throw new TokenError(errMsg)
    let decode
    try {
      decode = jwt.verify(userToken.name, common.security.secretKey)
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        errMsg = 'token已过期'
      }
      throw new TokenError(errMsg)
    }
    ctx.auth = decode
    await next()
  }
}
