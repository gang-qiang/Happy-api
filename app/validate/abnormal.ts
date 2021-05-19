import common from '@app/utils/common'
import { checkObj, checkArr } from '@app/utils/utils'

module.exports = app => {
  const { validator } = app

  // 校验sdk信息
  validator.addRule('abSdk', (_, value) => {
    checkObj(value, '请输入sdk信息')
  })

  // 校验错误信息
  validator.addRule('abException', (_, value) => {
    checkObj(value, '请输入错误详情信息')
  })

  // 校验错误信息 list
  validator.addRule('abExceptions', (_, value) => {
    checkArr(value, '请输入错误详情信息')
  })

  // 校验请求方信息
  validator.addRule('abRequest', (_, value) => {
    checkObj(value, '请输入请求信息')
  })

  // 校验错误类型
  validator.addRule('abnormalType', (_, value) => {
    if (value && !Object.keys(common.ERROR_TYPE).includes(value)) {
      return '请输入正确的错误类型'
    }
  })
}
