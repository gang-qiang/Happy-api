import * as mhcHelper from '@mhc/mhc-helper'

module.exports = app => {
  const { validator } = app

  // 校验产品名是否正确
  validator.addRule('productName', (_, value) => {
    if (!mhcHelper.isString(value)) {
      return '产品名称应该是字符串'
    }
    if (value.length < 3 || value.length > 30) {
      return ('产品名称的长度应该在3-30之间')
    }
  })

  // 校验产品描述是否正确
  validator.addRule('productDescription', (_, value) => {
    if (!mhcHelper.isString(value)) {
      return '产品描述应该是字符串'
    }
    if (value.length < 5 || value.length > 30) {
      return ('产品描述的长度应该在5-30之间')
    }
  })
}
