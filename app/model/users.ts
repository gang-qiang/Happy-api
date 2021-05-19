import { Application } from 'egg'
import * as bcrypt from 'bcryptjs'
import BaseModel from '../base/BaseModel'

export default (app: Application) => {
  const { STRING, TEXT } = app.Sequelize

  const modelSchema = BaseModel(app, 'users', {
    username: STRING(32),
    phoneNum: { type: STRING(32), comment: '电话', field: 'phone_num' },
    email: { type: STRING(255), comment: '邮箱', field: 'email' },
    password: {
      type: TEXT(),
    },
    description: TEXT(),
  }, {
    setterMethods: {
      async password (val) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        const that = this as any
        that.setDataValue('password', psw)
      },
    },
  })

  modelSchema.associate = () => {
    app.model.Users.belongsToMany(app.model.Demands, {
      through: app.model.DemandUserRelationships,
      foreignKey: 'userId',
      otherKey: 'demandId',
    })
    app.model.Users.hasMany(app.model.Products)
  }
  return modelSchema
}
