import { Service } from 'egg'

// const Redis = require('ioredis')

interface SessionItem{
  phone: String
  sessionId: String
  userId: Number
}

export default class SessionService extends Service {
  /**
   * 根据环境参数和用户手机号查询session
   * @param body
   * @returns Arrary SessionItem
   */
  async findSession (env: string = 'm', loginName: string, pageNo: number, pageSize: number) {
    const { app } = this
    const redis = app.redis?.[env]
    const keys = await redis.keys('B2B_APP_SESSION_*')
    if (keys.length === 0) {
      return []
    }

    // 遍历获取所有key-value
    const promiseList = keys.map(key => redis.get(key).then(value => {
      const obj = JSON.parse(value || '{}')
      const { attrs, id: sessionId } = obj || {}
      const { LOGIN_NAME: phone, USER_ID: userId } = attrs || {}
      return { phone, sessionId, userId }
    }))
    const results: Array<SessionItem> = await Promise.all(promiseList)
    let sessions: Array<SessionItem> = results

    // 过滤出来符合条件的session
    if (loginName) {
      sessions = results.filter((item: SessionItem) => item.phone.includes(loginName))
    }
    const data = sessions?.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    const result: object = {
      data: data || [],
      pageSize: Number(pageSize) || 0,
      pageNo: Number(pageNo) || 0,
      total: sessions?.length || 0,
    }

    return result
  }
}
