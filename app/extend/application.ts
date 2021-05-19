import common, { REDIS_TEST_ENVS, REDIS_ENV_CONFIG, } from '../utils/common'

const Redis = require('ioredis')

const ELS_INDEX = Symbol('ELS_INDEX')

const redisPool: any = {}

module.exports = {
  get ELS_INDEX () {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[ELS_INDEX]) {
      this[ELS_INDEX] = this.config.env === 'prod' ? common.ONLINE_ELS_INDEX : common.ELS_INDEX
    }
    return this[ELS_INDEX]
  },
  get redis () {
    if (!redisPool.m && this.config.env === 'test') { // 测试环境才去连接 redis，判断下 redis 实例，保证只挂载一次
      REDIS_TEST_ENVS.forEach(e => {
        const host = REDIS_ENV_CONFIG.test.host.replace('test', e) // 替换成具体环境 host
        redisPool[e] = new Redis({ ...REDIS_ENV_CONFIG.test, host })
      })
    }
    if (!redisPool.pre && this.config.env !== 'test') redisPool.pre = new Redis({ ...REDIS_ENV_CONFIG.pre })
    if (!redisPool.online && this.config.env !== 'test')redisPool.online = new Redis({ ...REDIS_ENV_CONFIG.online })

    return redisPool
  },
}
