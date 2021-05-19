import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  static: true,
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
  elasticsearch: {
    enable: true,
    package: 'egg-es',
  },
  cache: {
    enable: true,
    package: 'egg-cache',
  },
}

export default plugin
