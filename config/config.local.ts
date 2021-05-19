import { EggAppConfig, PowerPartial } from 'egg'
import common from '../app/utils/common'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}
  const userConfig = {
    // eslint-disable-next-line global-require
    sequelize: require('../database/config.json').development,
  }
  config.checkAuth = {
    enable: false
  }
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径。
    basePath: '/',
    // 接口文档的标题，描述或其它。
    apiInfo: {
      title: 'mew-api', // 接口文档的标题。
      description: 'swagger-ui for mew-api document.', // 接口文档描述。
      version: '1.0.0', // 接口文档版本。
    },
    schemes: ['http', 'https'], // 配置支持的协议。
    consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
    produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
    enableSecurity: false, // 是否启用授权，默认 false（不启用）。
    // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
    routerMap: false, // 是否启用自动生成路由，默认 true (启用)。
    enable: true, // 默认 true (启用)。
  }
  config.elasticsearch = {
    host: common.LOCAL_ES_HOST,
    apiVersion: '7.x',
  }
  return {
    ...config,
    ...userConfig,
  }
}
