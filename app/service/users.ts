import { Service } from 'egg'
import * as Sequelize from 'sequelize'
import * as bcrypt from 'bcryptjs'
import { IdParams } from '../interface/index.d'

const { Op } = Sequelize as any
const cacheName = 'users'
export default class UsersService extends Service {
  /**
   * 获取全部用户信息
   * @param body
   */
  async findAllUsers (body) {
    const { ctx, app } = this
    const { username = '' } = body
    const where: any = {}
    const attributes: String[] = ['id', 'username', 'description', 'created_at']
    if (!username) {
      // 完整用户数据 读取缓存信息
      const users = await app.cache.get(cacheName, async () => {
        const result = await ctx.model.Users.findAll({ attributes })
        return result
      }, 0)
      return users
    }

    // 正常查询 根据用户名
    where.username = {
      [Op.like]: `%${username}%`,
    }
    const query = { attributes, where }

    const result = await ctx.model.Users.findAll(query)
    return result
  }

  /**
   * 根据ID查用户信息
   * @param body
   */
  async findUserById (body: IdParams) {
    const { ctx } = this
    const { id } = body
    const result = await ctx.model.Users.findByPk(id)
    const { username, description } = result || {}
    return { id, username, description }
  }

  /**
   * 创建用户
   * @param body
   */
  async create (body: UsersItem) {
    const { ctx, app } = this
    const { username } = body || {}
    const user = await ctx.model.Users.findOne({
      where: {
        username,
      },
    })
    if (user) {
      throw new Error('该用户已存在')
    }
    const result = await ctx.model.Users.create(body)
    await app.cache.del(cacheName)
    return result
  }

  /**
   * 更新用户
   * @param body
   */
  async update (body: UsersItem) {
    const { ctx, app } = this
    const { id, password, description } = body || {}
    if (!`${id}`) {
      throw new Error('请选择用户！')
    }
    const user = await ctx.model.Users.findByPk(id)
    if (!user) {
      throw new Error('未找到该用户')
    }
    const result = await user.update({ password, description })
    await app.cache.del(cacheName)
    return result
  }

  /**
   * 检查用户名和密码(登录)
   */
  async verifyNickNamePassword (body: UsersItem) {
    const { ctx } = this
    const { username, password } = body || {}
    const user = await ctx.model.Users.findOne({
      where: { username },
    })
    if (!user) {
      throw new Error('用户名或密码错误！')
    }
    const { password: psd } = user || {}

    const correct = bcrypt.compareSync(password, psd)
    if (!correct) {
      throw new Error('用户名或密码错误！')
    }
    return user
  }

  /**
   * 删除用户
   * @param id
   */
  async delete (id: number) {
    const { ctx, app } = this
    const result = await ctx.model.Users.destroy({
      where: {
        id,
      },
    })
    await app.cache.del(cacheName)
    return result
  }
}

export interface UsersItem {
  id?: number
  username: string
  password: string
  description?: string
  [propName: string]: any
}
