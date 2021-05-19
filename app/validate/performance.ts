import { checkObj } from '@app/utils/utils'

module.exports = app => {
  const { validator } = app

  // 校验sdk信息
  validator.addRule('sdk', (_, value) => {
    checkObj(value, '请输入 sdk 信息')
  })

  // 校验错误信息
  validator.addRule('perfData', (_, value) => {
    checkObj(value, '没有性能数据')
  })
}
