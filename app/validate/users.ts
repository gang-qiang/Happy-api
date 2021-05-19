import * as mhcHelper from '@mhc/mhc-helper'

// 校验用户描述
function description (value) {
  if (!mhcHelper.isString(value)) {
    return '用户描述应该是字符串'
  }
  if (value.length < 5 || value.length > 20) {
    return ('用户描述的长度应该在5-20之间')
  }
}
module.exports = app => {
  const { validator } = app

  // 校验用户是否正确
  validator.addRule('username', (_, value) => {
    if (value.length < 2 || value.length > 18) {
      return ('用户名的长度应该在2-18之间')
    }
  })

  // 校验用户描述是否正确
  validator.addRule('description', (_, value) => {
    description(value)
  })

  // 校验用户密码是否正确
  validator.addRule('password', (_, value) => {
    if (!(`${value}`)) {
      return '请输入密码'
    }
    if (value.length < 5 || value.length > 20) {
      return ('密码的长度应该在5-20之间')
    }
  })
}
