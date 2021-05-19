import { Application } from 'egg'
import { snakeCase } from 'lodash'
import * as moment from 'moment-timezone'
import common from '../utils/common'

const getDefaultAttributes = (options: object, sequelize: any): object => {
  const { DATE } = sequelize

  const defaultAttributes = {
    created_at: {
      type: DATE,
      get () {
        return moment((this as any).getDataValue('created_at')).tz(common.TIME_ZONE).format(common.TIME_FORMAT)
      },
    },
    updated_at: {
      type: DATE,
      get () {
        return moment((this as any).getDataValue('updated_at')).tz(common.TIME_ZONE).format(common.TIME_FORMAT)
      },
    },
  }

  // 需要从 options 读取的配置信息，用于下方做过滤的条件
  const attributes = ['createdAt', 'updatedAt', 'deletedAt']

  Object.keys(options).forEach((value: string) => {
    if (attributes.includes(value) && (options as any)[value] === false) {
      delete (defaultAttributes as any)[snakeCase(value)]
    }
  })
  return defaultAttributes || {}
}

export default function BaseModel (
  app: Application,
  table: string,
  attributes: any,
  options: object = {},
) {
  const { Op, INTEGER } = app.Sequelize

  const modelSchema: any = app.model.define(table, {
    id: {
      type: INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    ...attributes,
    ...getDefaultAttributes(options, app.Sequelize),
  }, {
    timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
    underscored: true, // 不使用驼峰样式自动添加属性，而是下划线样式 [ createdAt => created_at ]
    // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    freezeTableName: false,
    ...options,
    paranoid: true, // 软删除
    scopes: {
      // 定义全局作用域，使用方法如: .scope('onlyTrashed') or .scope('onlyTrashed1', 'onlyTrashed12') [ 多个作用域 ]
      onlyTrashed: {
        // 只查询软删除数据
        where: {
          deleted_at: {
            [Op.not]: null,
          },
        },
      },
    },
  })

  modelSchema.getAttributes = (): string[] => Object.keys(attributes)

  modelSchema.findAttribute =
  (attribute: string): object | undefined => (attributes as any)[attribute]

  modelSchema.fillable = (): string[] => []

  modelSchema.hidden = (): string[] => []

  modelSchema.visible = (): string[] => []

  return modelSchema
}
