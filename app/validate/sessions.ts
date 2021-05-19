import { REDIS_ALL_ENVS } from '../utils/common'

module.exports = app => {
  const { validator } = app

  // 校验用户是否正确
  validator.addRule('isEnv', (_, value) => {
    if (!REDIS_ALL_ENVS.includes(value)) {
      return ('请选择正确的环境')
    }
  })
}
