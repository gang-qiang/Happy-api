import { Application } from 'egg'
import BaseModel from '../base/BaseModel'

export default (app: Application) => {
  const { INTEGER } = app.Sequelize

  const modelSchema = BaseModel(app, 'demandUserRelationships', {
    demandId: { type: INTEGER, comment: '需求ID', field: 'demand_id', primaryKey: true },
    userId: { type: INTEGER, comment: '用户ID', field: 'user_id', primaryKey: true },
  })

  return class extends modelSchema {}
}
