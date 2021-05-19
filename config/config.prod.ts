import { EggAppConfig, PowerPartial } from 'egg'
import common from '../app/utils/common'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}
  const userConfig = {
    // eslint-disable-next-line global-require
    sequelize: require('../database/config.json').production,
  }
  config.elasticsearch = {
    host: common.ONLINE_ES_HOST,
    apiVersion: '7.x',
  }
  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  }
  return {
    ...config,
    ...userConfig,
  }
}
