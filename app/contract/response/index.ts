/**
 * base
 */
export const baseResponse = {
  msg: { type: 'string' },
  code: { type: 'number', description: '状态码' },
}

export const pageResponse = {
  pageSize: { type: 'number', description: '每页显示数量' },
  pageNo: { type: 'number', description: '页码' },
  total: { type: 'number', description: '总条数' },
}

export const tokenResponse = {
  token: { type: 'string', description: 'token' },
}

/**
 * user
 */
export const queryUserResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'user' },
}

export const getUserResponse = {
  ...baseResponse,
  data: { type: 'user' },
}

export const loginUserResponse = {
  data: { type: 'tokenResponse' },
}

/**
 * product
 */

export const queryProductResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'productWidthOther' },
  ...pageResponse,
}

export const queryAllProductResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'simpleProduct' },
}
/**
 * endProduct
 */
export const queryEndProductResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'endProductWidthFront' },
  ...pageResponse,
}

/**
 * demand
 */
export const queryDemandResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'demandWithProAndUser' },
  ...pageResponse,
}

/**
 * abnormal
 */
export const queryAbnormalResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'abnormal' },
  ...pageResponse,
}

/**
 * abnormal 统计数据
 */

export const queryAbnormalTodayStatisticResponse = {
  ...baseResponse,
  data: { type: 'todayAbnormalData', itemType: '今日统计数据' },
}

export const queryAbnormalTimeStatisticResponse = {
  ...baseResponse,
  data: { type: 'timeAbnormalData', itemType: '按天统计数据' },
}

export const queryAbnormalTypeStatisticResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'abnormalType' }
}

export const queryAbnormalProjectStatisticResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'abnormalProject' }
}
/**
 * session
 */
export const querySessionResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'session' },
  ...pageResponse,
}

/**
 * files
 */
export const uploadResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'fileItem' },
}

/**
 * files
 */
export const qiniuTokenResponse = {
  ...baseResponse,
  data: { type: 'string' },
}

/**
 * files
 */
export const filesResponse = {
  ...baseResponse,
  data: { type: 'array', itemType: 'fileItem' },
}
