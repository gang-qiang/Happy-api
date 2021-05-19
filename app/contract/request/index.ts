import * as _ from 'lodash'
import { product, endProduct, demand, abnormal } from '../dto'

/**
 * user
 */

export const creatUserRequest = {
  username: { type: 'string', description: '用户名' },
  password: { type: 'string', description: '密码' },
  description: { type: 'string', description: '描述' },
}

export const loginUserRequest = {
  username: { type: 'string', description: '用户名' },
  password: { type: 'string', description: '密码' },
}

export const updateUserRequest = {
  password: { type: 'string', description: '密码' },
  description: { type: 'string', description: '描述' },
}

/**
 * product
 */

const pro = _.omit(product, ['id'])

export const creatProductRequest = {
  ...pro,
}

export const addEndRelateRequest = {
  id: { type: 'number', description: '前端项目id' },
  endIds: { type: 'array', itemType: 'number', description: '后端项目ID数组' },
}
/**
 * endProduct
 */

const endPro = _.omit(endProduct, ['id'])

export const creatEndProductRequest = {
  ...endPro,
}

/**
 * demand
 */

const dmd = _.omit(demand, ['id'])
export const creatDemandRequest = {
  ...dmd,
}

export const addProRelateRequest = {
  id: { type: 'number', description: '需求id' },
  frontIds: { type: 'array', itemType: 'number', description: '前端项目ID数组' },
}

export const addUserRelateRequest = {
  id: { type: 'number', description: '需求id' },
  userIds: { type: 'array', itemType: 'number', description: '用户ID数组' },
}

/**
 * abnormal
 */

const abnl = _.omit(abnormal, ['id'])
export const createAbnormalRequest = {
  ...abnl,
}

export const createAbnormalArrRequest = {
  abnormalArr: { type: 'array', itemType: 'createAbnormalRequest', description: '异常数组' },
}
