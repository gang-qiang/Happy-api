import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import common from '../app/utils/common'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1589337641853_4946`

  // add your egg config in here
  config.middleware = ['errorHandler', 'checkAuth']
  config.checkAuth = {
    enable: true,
    ignore: ctx => {
      const { api = '' } = common || {}
      const ignoreRouter = [
        `${api}/users/login`,
        `${api}/abnormal`,
        `${api}/products`
      ]
      const { request = {} } = ctx || {}
      const { path = '' } = request
      if (ignoreRouter.includes(path)) {
        return true
      }
      return false
    },
  }
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'], // 白名单
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }
  // add your special config in here
  const bizConfig = {
    errorHandler: {
      match: '/api',
    },
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  }

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  }

  // 文件上传
  config.multipart = {
    mode: 'file',
    fileSize: '50mb',
    // tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
    cleanSchedule: { // 配置定时清除临时保存的文件
      cron: '0 30 4 * * *',
    },
    fileExtensions: ['.pdf', '.doc', '.docx'], // 需要额外支持的扩展名
  }

  // 缓存配置（后期可搭配redis）
  config.cache = {
    default: 'memory',
    stores: {
      memory: {
        driver: 'memory',
        max: 100,
        ttl: 0,
      },
    },
  }
  config.bodyParser = {
    enableTypes: ['json', 'form', 'text'],
  }

  // 打开前置代理
  config.proxy = true
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  }
}
