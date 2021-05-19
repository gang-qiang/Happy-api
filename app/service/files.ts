import { Service } from 'egg'

const qiniu = require('qiniu')

const CUSTOM_NAME_TYPE = '2' // 命名规则 2 时间戳+随机数+后缀

// 定义鉴权对象token和配置
const accessKey = 'BzDkpyEeUNKVhvJn5spXnnwzQXYBnS034DXkbP3U'
const secretKey = 'tZBXqnjKq4SpTyGtH_W2yQJh_mfBJCpsf1aKDk2P'
const bucket = 'maihaoche' // bucket空间
const downloadUrl = 'https://img.maihaoche.com/'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey) // 鉴权对象 mac
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z0 // 空间对应的机房-华东
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

const bucketManager = new qiniu.rs.BucketManager(mac, config)

export default class FilesService extends Service {
  /**
   * 上传文件到七牛云
   * @param files 要上传的文件数组
   * @param dir 要上传到的文件目录
   */
  async uploadFiles (request) {
    const { files } = request || {}
    const { dir = 'monitoring/assets/', nameType } = request.body || {}
    const options = {
      scope: bucket,
      expires: 7200, // 有效期 7200s
      force: true,
      callbackBodyType: 'application/json',
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const token = putPolicy.uploadToken(mac) // 上传token

    const taskList: Array<Object> = files.map(file => {
      let key = dir + file.filename
      const filePath = file.filepath
      if (nameType === CUSTOM_NAME_TYPE) { // 如果是
        const lastIndex = file.filename.lastIndexOf('.') // 后缀名起点下标
        const suffix = lastIndex !== -1 ? file.filename.substring(lastIndex) : '' // 截取图片后缀
        const randomNum = Math.ceil(Math.random() * 1000) // 取1000以下的随机数
        key = `${dir}${+new Date()}${randomNum}${suffix}`
      }

      return new Promise((resolve, reject) => {
        formUploader.putFile(token, key, filePath, putExtra, (respErr, respBody, respInfo) => {
          if (respErr) {
            throw respErr
          }
          if (respInfo.statusCode === 200) {
            resolve({ ...respBody, url: downloadUrl + key })
          } else {
            reject(respInfo)
          }
        })
      })
    })
    const fileList = await Promise.all(taskList)
    return fileList
  }

  /**
   * 获取七牛token
   */
  async getToken () {
    const options = {
      scope: bucket,
      expires: 7200, // 有效期 7200s
      force: true,
      callbackBodyType: 'application/json',
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const token = putPolicy.uploadToken(mac) // 上传token

    return token
  }

  /**
   * 根据分页信息和前缀获取文件列表
   * @param query
   */
  async queryFiles (query) {
    const { prefix = '', pageNo, pageSize } = query || {}
    const options = {
      limit: 10000, // 每次返回的文件数量上限
      prefix,
    }
    const findFiles = new Promise((resolve, reject) => {
      bucketManager.listPrefix(bucket, options, (err, respBody, respInfo) => {
        if (err) {
          console.log('查询失败', err)
          throw err
        }
        if (respInfo.statusCode === 200) {
          // 因为 pageNo 是从 1 开始的所以简单做下分页
          const newItems = respBody?.items.sort((a, b) => b?.putTime - a?.putTime)
          const data = newItems?.slice((pageNo - 1) * pageSize, pageNo * pageSize)
          const response = {
            data: data || [],
            pageSize: Number(pageSize) || 0,
            pageNo: Number(pageNo) || 0,
            total: respBody?.items?.length || 0,
          }
          resolve(response)
        } else {
          reject(respInfo)
        }
      })
    })
    const result: any = await findFiles
    return result
  }
}
