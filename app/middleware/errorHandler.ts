import { Context } from 'egg'

// 这里是你自定义的中间件
export default function errorHandler () {
  return async (ctx: Context, next: () => Promise<any>) => {
    // 你可以获取 config 的配置：
    // const config = ctx.app.config;
    try {
      await next()
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx)

      const status = err.status || 500
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? '网络出错！'
        : err.message

      // 从 error 对象上读出各个属性，设置到响应中

      if (status === 422) {
        ctx.body = {
          msg: '参数格式错误！',
          code: status,
          result: err.errors,
        }
        return
      }
      ctx.body = {
        msg: error?.msg || error,
        code: status || 400,
      }
      ctx.status = 200
    }
  }
}
