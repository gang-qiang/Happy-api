import EnumData from '../base/BaseEnum'

/** 错误类型 */
enum ERROR_TYPE {
  ReferenceError = 1,
  SyntaxError,
  RangeError,
  TypeError,
  URIError,
  EvalError,
  UnhandledRejection,
  unhandledrejection,
  SourceError,
  Error
}

namespace ERROR_TYPE {
  export function match (val?: string, getAll?: boolean) {
    const obj: any = {}
    // 对象代表当一个不存在的变量被引用时发生的错误
    obj[ERROR_TYPE.ReferenceError] = '引用错误'

    // 尝试解析语法上不合法的代码的错误
    obj[ERROR_TYPE.SyntaxError] = '语法错误'

    // 一个值不在其所允许的范围或者集合中
    obj[ERROR_TYPE.RangeError] = '范围错误'

    // 值的类型非预期类型时发生的错误
    obj[ERROR_TYPE.TypeError] = '类型错误'

    // 以一种错误的方式使用全局URI处理函数而产生的错误。
    // 主要涉及encodeURI()、decodeURI()、encodeURIComponent()
    // decodeURIComponent()、escape()和unescape()这六个函数
    obj[ERROR_TYPE.URIError] = 'URI错误'

    // eval 函数的错误，不再会被 js 抛出
    obj[ERROR_TYPE.EvalError] = 'eval 错误'

    // promise 抛出的错误
    obj[ERROR_TYPE.UnhandledRejection] = 'promise 错误'

    obj[ERROR_TYPE.unhandledrejection] = 'promise 错误(旧数据)'

    // 自定义的名字，本身没有这个错误
    obj[ERROR_TYPE.SourceError] = '资源加载异常'
    obj[ERROR_TYPE.Error] = '未知错误'
    if (getAll) {
      return obj
    }
    if (val && obj[val]) {
      return obj[val]
    }
    return obj[ERROR_TYPE.Error]
  }
}

enum PERF_TYPE {
  FPT = 'fpt',
  TTI = 'tti',
  READY = 'ready',
  LOAD = 'load',
  FB = 'firstByte',
  DNS = 'dns',
  TCP = 'tcp',
  TTFB = 'ttfb',
  TRANS = 'trans',
  DOM = 'dom',
  RES = 'res',
  SSL = 'ssl'
}

namespace PERF_TYPE {
  export function match (val?: string) {
    const map: any = {}
    map[PERF_TYPE.FPT] = '首次渲染时间/白屏时间'
    map[PERF_TYPE.TTI] = '首次可交互时间'
    map[PERF_TYPE.READY] = '页面准备时间'
    map[PERF_TYPE.LOAD] = '页面 onload 时间'
    map[PERF_TYPE.FB] = '首包时间'
    map[PERF_TYPE.DNS] = 'DNS 查询耗时'
    map[PERF_TYPE.TCP] = 'TCP 连接耗时'
    map[PERF_TYPE.TTFB] = '请求响应耗时'
    map[PERF_TYPE.TRANS] = '内容传输耗时'
    map[PERF_TYPE.DOM] = 'dom 解析耗时'
    map[PERF_TYPE.RES] = '资源加载耗时'
    map[PERF_TYPE.SSL] = 'ssl 安全连接耗时'

    if (val && map[val]) {
      return map[val]
    }
    return map
  }
}

/** jwt 加密参数 */
const security = {
  secretKey: '346eyJjIjoiQ05VWDJxaTkiLCJpIjoiMTIifQDFSGSDAERGASDG534512345DFFS',
  expiresIn: 60 * 60 * 24 * 30, // 一个小时 * 24 * 30
}

/** 错误等级 */
const ERROR_LEVEL = new EnumData([
  ['ONLY_RECORD', 1, '记录错误'],
  ['WARNING', 2, '警告错误'],
])

// redis 连接参数
export const REDIS_ENV_CONFIG = {
  test: {
    port: 6379,
    host: 'svc-redis.test.svc.mhc.local',
    password: '123456',
    db: 0,
  },
  pre: {
    port: 6379,
    host: '6a4ec4d866ae4dc4741.redis.rds.aliyuncs.com',
    password: 'HuZTPrYpu2o',
    db: 0,
  },
  online: {
    port: 6379,
    host: '63a6b336b10143e8.m.cnhza.kvstore.aliyuncs.com',
    password: '63a6b336b10143e8:nVUV92uM',
    db: 0,
  }
}

// redis 环境枚举
export const REDIS_TEST_ENVS = ['m', 'h', 'c', 'o', 'u']
export const REDIS_ALL_ENVS = ['m', 'h', 'c', 'o', 'u', 'pre', 'online']

export default {
  api: '/api/v1',
  pageNo: 1,
  pageSize: 10,
  ERROR_TYPE,
  ERROR_LEVEL,
  PERF_TYPE,
  LOCAL_ES_HOST: 'http://172.21.10.61:8989',
  TEST_ES_HOST: 'http://172.21.10.61:8989',
  ONLINE_ES_HOST: 'http://115.233.220.92:61809',
  security,
  // els 索引前缀
  ELS_INDEX: 'mew_fe_monitor',
  PERF_INDEX: 'mew_fe_perf',
  ONLINE_ELS_INDEX: 'online_mew_fe_monitor',
  ONLINE_PERF_INDEX: 'online_mew_fe_perf',
  TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  TIME_ZONE: 'Asia/Shanghai',
  // 错误提示机器人链接
  TEST_ROBOT_URL: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=95edd579-3884-48c6-b52e-e385b506f78c',
  ONLINE_ROBOT_URL: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=4be07036-8d3c-44d8-b720-e31757e3a19f',
  // 前端项目异常详情链接
  WEB_ERR_DETAIL_URL: 'https://monitoring-c.maihaoche.net/IssuesList/IssuesDetail',
  ONLINE_WEB_ERR_DETAIL_URL: 'https://monitoring.maihaoche.com/IssuesList/IssuesDetail',
} as const
