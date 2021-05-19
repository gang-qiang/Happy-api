import { Application } from 'egg'
import { encodeId, jsonString } from '../utils/utils'
import BaseModel from '../base/BaseModel'

export default (app: Application) => {
  const { STRING, TEXT, INTEGER } = app.Sequelize

  const modelSchema = BaseModel(app, 'products', {
    name: { type: STRING(32), comment: '产品/应用名称' },
    alias: { type: STRING(32), comment: '别名' },
    description: { type: TEXT(), comment: '描述' },
    levelConfig: { type: TEXT(), comment: '错误登记配置', field: 'level_config' },
    gitUrl: { type: TEXT(), comment: 'git地址', field: 'git_url' },
    tecType: {
      type: INTEGER,
      defaultValue: 1,
      comment: '技术栈: 1: react; 2: vue; 3: express; 4: koa; 5: jquery',
      field: 'tec_type',
    },
    onlineUrl: { type: TEXT(), comment: '线上地址', field: 'online_url' },
    preUrl: { type: TEXT(), comment: '预发地址', field: 'pre_url' },
    testUrl: { type: TEXT(), comment: '测试地址', field: 'test_url' },
    appType: {
      type: INTEGER,
      defaultValue: 1,
      comment: '应用类型: 1: 移动端应用; 2: 钉钉微应用; 3: 中台应用; 4: 小程序; 5: 二方包; 6: node 服务',
      field: 'app_type',
    },
    appGroup: {
      type: INTEGER,
      defaultValue: 1,
      comment: '所属应用组: 1: faw; 2: brood;',
      field: 'app_group',
    },
    isJenkins: {
      type: INTEGER,
      defaultValue: 1,
      comment: '是否通过jenkins部署: 1: 是; 2: 否;',
      field: 'is_jenkins',
    },
    isGitRobot: {
      type: INTEGER,
      defaultValue: 1,
      comment: '是否部署git机器人: 1: 是; 2: 否;',
      field: 'is_git_robot',
    },
    nodeVersion: { type: STRING(8), comment: 'node版本', field: 'node_version' },
    userId: INTEGER,
  },
  {
    getterMethods: {
      id () {
        const id = (this as any).getDataValue('id')
        return encodeId(id)
      },
      levelConfig () {
        const levelConfig = (this as any).getDataValue('levelConfig')
        if (jsonString(levelConfig)) {
          return JSON.parse(levelConfig)
        }
        return []
      }
    },
  })

  modelSchema.associate = () => {
    app.model.Products.belongsToMany(app.model.EndProducts, {
      through: app.model.EndFrontRelationships,
      foreignKey: 'frontId',
      otherKey: 'endId',
    })

    app.model.Products.belongsToMany(app.model.Demands, {
      through: app.model.DemandProductRelationships,
      foreignKey: 'productId',
      otherKey: 'demandId',
    })

    app.model.Products.belongsTo(app.model.Users, {
      foreignKey: 'userId',
    })
  }

  return modelSchema
}
