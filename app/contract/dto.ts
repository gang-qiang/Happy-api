/**
 * 用户
 */
export const user = {
  id: { type: 'number', description: 'id 唯一键' },
  username: { type: 'string', description: '用户名' },
  phoneNum: { type: 'string', description: '电话' },
  email: { type: 'string', description: '邮箱' },
  description: { type: 'string', description: '描述' },
}

/**
 * 前端项目
 */
export const product = {
  id: { type: 'number', description: 'id 唯一键' },
  name: { type: 'string', description: '产品/应用名称' },
  alias: { type: 'string', description: '别名' },
  description: { type: 'string', description: '描述' },
  levelConfig: {
    type: 'string',
    description:
      '错误等级配置 "[{"typeCode":1,"typeDesc":"引用错误","levelCode":1,"levelDesc":"记录错误"}]"',
  },
  userId: { type: 'number', description: 'owner所有人ID' },
  gitUrl: { type: 'string', description: 'git地址' },
  tecType: {
    type: 'number',
    description: '技术栈: 1: react; 2: vue; 3: express; 4: koa; 5: jquery',
  },
  onlineUrl: { type: 'string', description: '线上地址' },
  preUrl: { type: 'string', description: '预发地址' },
  testUrl: { type: 'string', description: '测试地址' },
  appType: {
    type: 'number',
    description:
      '应用类型: 1: 移动端应用; 2: 钉钉微应用; 3: 中台应用; 4: 小程序; 5: 二方包; 6: node 服务',
  },
  appGroup: {
    type: 'number',
    description: '所属应用组: 1: faw; 2: brood;',
  },
  isJenkins: {
    type: 'number',
    description: '是否通过jenkins部署: 1: 是; 2: 否;',
  },
  isGitRobot: {
    type: 'number',
    description: '是否部署git机器人: 1: 是; 2: 否;',
  },
  nodeVersion: { type: 'string', description: 'node版本' },
}

export const simpleProduct = {
  id: { type: 'number', description: 'id 唯一键' },
  name: { type: 'string', description: '产品/应用名称' },
  alias: { type: 'string', description: '别名' },
  user: { type: 'user', description: '关联的owner信息' },
}
/**
 * 后端项目
 */
export const endProduct = {
  id: { type: 'number', description: 'id 唯一键' },
  name: { type: 'string', description: '产品/应用名称' },
  alias: { type: 'string', description: '别名' },
  description: { type: 'string', description: '描述' },
  ownerName: { type: 'string', description: '所有人用户名' },
  ownerId: { type: 'number', description: '所有人ID' },
  gitUrl: { type: 'string', description: 'git地址' },
  onlineUrl: { type: 'string', description: '线上地址' },
  preUrl: { type: 'string', description: '预发地址' },
  testUrl: { type: 'string', description: '测试地址' },
  isJenkins: {
    type: 'number',
    description: '是否通过jenkins部署: 1: 是; 2: 否;',
  },
}

/**
 * 前端项目(关联后端项目)数据
 */
export const productWidthOther = {
  ...product,
  endProducts: {
    type: 'array',
    itemType: 'endProduct',
    description: '关联的后端项目',
  },
  user: { type: 'user', description: '关联的owner信息' },
}

/**
 * 后端项目(关联前端项目)数据
 */
export const endProductWidthFront = {
  ...product,
  products: {
    type: 'array',
    itemType: 'product',
    description: '关联的前端项目',
  },
}

/**
 * 需求
 */
export const demand = {
  id: { type: 'number', description: 'id 唯一键' },
  name: { type: 'string', description: '需求名称' },
  description: { type: 'string', description: '描述' },
  PRDUrl: { type: 'string', description: 'prd文档地址' },
  JIRAUrl: { type: 'string', description: 'JIRA文档地址' },
  UIUrl: { type: 'string', description: 'UI涉及文档地址' },
  APIUrl: { type: 'string', description: '接口文档地址' },
}

/**
 * 需求(关联前端项目和用户)数据
 */
export const demandWithProAndUser = {
  ...demand,
  products: {
    type: 'array',
    itemType: 'product',
    description: '关联的前端项目',
  },
  users: { type: 'array', itemType: 'user', description: '关联的用户' },
}

/**
 * 异常数据
 */

export const sdk = {
  name: { type: 'string', description: 'skd名称', required: true },
  version: { type: 'string', description: 'skd版本', required: true },
}

export const request = {
  url: {
    type: 'string',
    description: '请求链接地址 location.href',
    required: true,
  },
  userAgent: { type: 'string', description: '用户代理信息', required: true },
}
export const exception = {
  type: { type: 'string', description: '错误类型关键字', required: true },
  typeCode: { type: 'number', description: '错误类型编码', required: true },
  typeDesc: { type: 'string', description: '错误类型描述', required: true },
  message: { type: 'string', description: '错误信息', required: true },
  stack: { type: 'string', description: '错误栈', required: true },
}
export const abnormal = {
  id: { type: 'string', description: 'id 唯一键' },
  sdk: { type: 'sdk', description: 'sdk 信息' },
  exception: { type: 'exception', description: '异常详情' },
  request: { type: 'request', description: '请求方信息' },
  productId: { type: 'string', description: '产品ID' },
}

export const abnormals = {
  id: { type: 'string', description: 'id 唯一键' },
  sdk: { type: 'sdk', description: 'sdk 信息' },
  exceptions: {
    type: 'array',
    itemType: 'exception',
    description: '异常详情 list',
  },
  request: { type: 'request', description: '请求方信息' },
  productId: { type: 'string', description: '产品ID' },
}

/** abnormal 统计数据 */
export const abnormalNumber = {
  number: { type: 'number', description: '今日统计数量' },
  moreThanYesterday: { type: 'number', description: '较昨日新增或减少的数量' },
}

export const abnormalType = {
  type: { type: 'string', description: '错误类型' },
  typeCode: { type: 'string', description: '错误类型Code' },
  typeDesc: { type: 'string', description: '错误类型描述' },
  number: { type: 'number', description: '数量' },
}

export const abnormalProject = {
  projectId: { type: 'string', description: '项目ID' },
  projectName: { type: 'string', description: '项目名称' },
  number: { type: 'string', description: '错误类型Code' },
}

export const todayAbnormalData = {
  abnormalNumber: {
    type: 'abnormalNumber',
    description: '今日异常次数统计数据',
  },
  abnormalType: {
    type: 'abnormalType',
    description: '今日异常报错最多的错误类型统计数据',
  },
  abnormalProject: {
    type: 'abnormalProject',
    description: '今日异常报错最多的项目的统计数据',
  },
}

export const timeAbnormalData = {
  date: { type: 'array', itemType: 'string', description: '日期' },
  number: { type: 'array', itemType: 'number', description: '错误数量' },
}

/**
 * session
 */
export const session = {
  userId: { type: 'number', description: '用户唯一id' },
  phone: { type: 'string', description: '用户登录账号' },
  sessionId: { type: 'string', description: 'sessionId' },
}

/**
 * file
 */
export const fileItem = {
  key: { type: 'string', description: '文件唯一id' },
  hash: { type: 'string', description: '文件唯一key' },
  url: { type: 'string', description: '文件访问链接' },
}
