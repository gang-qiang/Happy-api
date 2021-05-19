import { Application } from 'egg'
import BaseModel from '../base/BaseModel'

export default (app: Application) => {
  const { STRING, TEXT } = app.Sequelize

  const modelSchema = BaseModel(app, 'demands', {
    name: { type: STRING(32), comment: '需求名称' },
    description: { type: TEXT(), comment: '描述' },
    PRDUrl: { type: TEXT(), comment: 'prd文档地址', field: 'PRD_url' },
    JIRAUrl: { type: TEXT(), comment: 'JIRA文档地址', field: 'JIRA_url' },
    UIUrl: { type: TEXT(), comment: 'UI涉及文档地址', field: 'UI_url' },
    APIUrl: { type: TEXT(), comment: '接口文档地址', field: 'API_url' },
  })

  modelSchema.associate = () => {
    app.model.Demands.belongsToMany(app.model.Products, {
      through: app.model.DemandProductRelationships,
      foreignKey: 'demandId',
      otherKey: 'productId',
    })

    app.model.Demands.belongsToMany(app.model.Users, {
      through: app.model.DemandUserRelationships,
      foreignKey: 'demandId',
      otherKey: 'userId',
    })
  }

  return modelSchema
}
