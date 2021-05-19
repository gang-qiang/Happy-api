import { Application } from 'egg'
import BaseModel from '../base/BaseModel'

export default (app: Application) => {
  const { STRING, TEXT, INTEGER } = app.Sequelize

  const modelSchema = BaseModel(app, 'endProducts', {
    name: { type: STRING(32), comment: '产品/应用名称' },
    alias: { type: STRING(32), comment: '别名' },
    description: { type: TEXT(), comment: '描述' },
    ownerName: { type: STRING(64), comment: '所有人姓名' },
    ownerId: { type: INTEGER, comment: '所有人ID' },
    gitUrl: { type: TEXT(), comment: 'git地址', field: 'git_url' },
    onlineUrl: { type: TEXT(), comment: '线上地址', field: 'online_url' },
    preUrl: { type: TEXT(), comment: '预发地址', field: 'pre_url' },
    testUrl: { type: TEXT(), comment: '测试地址', field: 'test_url' },
    isJenkins: {
      type: INTEGER,
      defaultValue: 1,
      comment: '是否通过jenkins部署: 1: 是; 2: 否;',
      field: 'is_jenkins',
    },
  })

  modelSchema.associate = () => {
    app.model.EndProducts.belongsToMany(app.model.Products, {
      through: app.model.EndFrontRelationships,
      foreignKey: 'endId',
      otherKey: 'frontId',
    })
  }
  return modelSchema
}
