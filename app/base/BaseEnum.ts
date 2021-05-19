/* eslint-disable no-console */
export default class EnumData {
  [x: string]: any

  constructor (data) {
    const keyMap = {}
    const valueMap = {}
    data.forEach(([key, value, text]) => {
      keyMap[key] = value
      valueMap[value] = text
    })

    const ans = new Proxy(data, {
      get (target, propKey) {
        if (keyMap[propKey]) {
          return keyMap[propKey]
        }
        if (valueMap[propKey]) {
          return valueMap[propKey]
        }
        if (Array.prototype.hasOwnProperty(propKey)) {
          if (typeof Array.prototype[propKey] === 'function') {
            return Array.prototype[propKey].bind(target)
          }
          return target[propKey]
        }
        return null
      },
      set (target) {
        console.warn('不可变对象，禁止设置值')
        return target
      },
    })
    return ans
  }
}
