import { Application } from 'egg'
import BaseModel from '../base/BaseModel'

export default (app: Application) => {
  const { INTEGER } = app.Sequelize

  const modelSchema = BaseModel(app, 'endFrontRelationships', {
    frontId: {
      type: INTEGER,
      comment: '前端项目ID',
      field: 'front_id',
      primaryKey: true,
    },
    endId: {
      type: INTEGER,
      comment: '后端项目ID',
      field: 'end_id',
      primaryKey: true,
    },
  })

  return class extends modelSchema {}
}
