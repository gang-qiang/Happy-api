/* eslint-disable no-bitwise */
import * as jwt from 'jsonwebtoken'
import * as mhcHelper from '@mhc/mhc-helper'
import { getTag } from '@mhc/mhc-helper'
import common from './common'

const generateToken = arr => {
  const { secretKey, expiresIn } = common.security
  const token = jwt.sign(
    arr, secretKey, {
      expiresIn,
    },
  )
  return token
}

// 校验是否为json
const jsonString = value => {
  if (!mhcHelper.isString(value)) {
    return false
  }
  try {
    const obj = JSON.parse(value)
    if (typeof obj !== 'object' || !obj) {
      return false
    }
    return true
  } catch (e) {
    return false
  }
}

// 校验对象
const checkObj = (value, msg) => {
  if (getTag(value) !== '[object Object]') return '格式不正确'
  if (JSON.stringify(value) === '{}') {
    return msg
  }
}

// 校验数组
const checkArr = (value, msg) => {
  if (getTag(value) !== '[object Array]') return '格式不正确'
  if (JSON.stringify(value) === '[]') {
    return msg
  }
}

// id 对称加密
const encodeId = id => {
  if (!id) return ''
  let sid = (id & 0xff000000)
  sid += (id & 0x0000ff00) << 8
  sid += (id & 0x00ff0000) >> 8
  sid += (id & 0x0000000f) << 4
  sid += (id & 0x000000f0) >> 4
  sid ^= 11184810
  return sid
}

// id 对称解密
const decodeId = sid => {
  if (!Number(sid)) {
    return false
  }
  let id
  sid ^= 11184810
  id = (sid & 0xff000000)
  id += (sid & 0x00ff0000) >> 8
  id += (sid & 0x0000ff00) << 8
  id += (sid & 0x000000f0) >> 4
  id += (sid & 0x0000000f) << 4
  return id
}

export {
  generateToken,
  jsonString,
  checkObj,
  checkArr,
  encodeId,
  decodeId,
}
