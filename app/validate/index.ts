import { jsonString } from '@app/utils/utils'

module.exports = app => {
  const { validator } = app

  // 校验是否为number（选填）
  validator.addRule('isNumber', (_, value) => {
    if (isNaN(value)) {
      return '请输入Number类型字段'
    }
  })

  // 校验是否为json（必填）
  validator.addRule('jsonString', (_, value) => {
    if (!jsonString(value)) {
      return '请输入 JSON STRING 类型字段'
    }
  })
}
