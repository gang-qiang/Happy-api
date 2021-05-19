import { Application } from 'egg'
import BaseModel from '../base/BaseModel'

export default (app: Application) => {
  const { INTEGER } = app.Sequelize

  const modelSchema = BaseModel(app, 'DemandProductRelationships', {
    demandId: { type: INTEGER, comment: '需求ID', field: 'demand_id', primaryKey: true },
    productId: { type: INTEGER, comment: '前端项目ID', field: 'product_id', primaryKey: true },
  })

  return class extends modelSchema {}
}
