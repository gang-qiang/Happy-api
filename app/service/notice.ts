import { Service } from 'egg'
import * as nodemailer from 'nodemailer'
import { post } from '../utils/request'
import common from '../utils/common'

const EMAIL_ACCOUNT = 'maihaocheFE@163.com'
const PASSWORD = 'AXVLPKLTWYKDZSGG'

const transporter = nodemailer.createTransport({
  service: 'smtp.163.com',
  host: 'smtp.163.com',
  secureConnection: true,
  port: 465,
  auth: {
    user: EMAIL_ACCOUNT, // 账号
    pass: PASSWORD, // 授权码

  },
})

export default class NoticeService extends Service {
  robotUrl: string

  constructor (ctx) {
    super(ctx)
    this.robotUrl = this.config?.env === 'prod' ? common.ONLINE_ROBOT_URL : common.TEST_ROBOT_URL
  }

  /**
   * 发送邮件
   * @param email 接收人邮箱
   * @param subject 标题
   * @param text 文本内容
   * @param html html 内容
   * @returns
   */
  async sendMail (email, subject, text, html?) {
    const mailOptions = {
      from: EMAIL_ACCOUNT,
      to: email,
      subject,
      text,
      html,
    }

    try {
      const result = await transporter.sendMail(mailOptions)
      return result
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  /**
   * 发送企业微信群通知
   * @param content 内容
   * @param phoneNumList 通知人电话 list
   */
  sendQYWeChat (content, phoneNumList) {
    post(
      this.robotUrl,
      {
        msgtype: 'text',
        text: {
          content,
          mentioned_mobile_list: phoneNumList
        }
      }
    )
  }
}
