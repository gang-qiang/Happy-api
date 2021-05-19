import { Service } from 'egg'
import * as Sequelize from 'sequelize'
import { Page, IdParams } from '../interface/index.d'
import { decodeId } from '../utils/utils'
import common from '../utils/common'

const { Op } = Sequelize as any
const cacheName = 'products'
export default class ProductService extends Service {
  /**
   * 获取所有产品信息，并且缓存
   * @param body
   */
  async findAll () {
    const { ctx } = this
    const products = await ctx.model.Products.findAll({
      attributes: ['id', 'name', 'alias', 'levelConfig'],
      include: {
        attributes: ['id', 'username', 'phoneNum', 'email'],
        model: ctx.model.Users,
      }
    })
    return products
  }

  /**
   * 根据分页信息获取产品
   * @param body
   */
  async findAllProducts (body: Page) {
    const { ctx } = this
    const { pageNo, pageSize, name, userId } = body
    const _page = pageNo ? Number(pageNo) : common.pageNo
    const _limit = pageSize ? Number(pageSize) : common.pageSize
    const where: any = {}
    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      }
    }
    if (userId) {
      where.userId = {
        [Op.eq]: Number(userId),
      }
    }
    const query = {
      order: [
        ['id', 'desc'],
      ],
      offset: (_page - 1) * _limit,
      limit: _limit,
      where,
      include: [
        {
          attributes: ['id', 'name', 'alias'],
          model: ctx.model.EndProducts,
        },
        {
          attributes: ['id', 'username'],
          model: ctx.model.Users,
        },
      ],
    }
    const result = await ctx.model.Products.findAndCountAll(query)
    const response = {
      data: result?.rows || [],
      pageSize: _limit,
      pageNo: _page,
      total: result?.count || 0,
    }
    return response
  }

  /**
   * 创建项目
   */
  async create (body: ProductItem) {
    const { ctx, app } = this
    const { name } = body || {}
    const product = await ctx.model.Products.findOne({
      where: {
        name,
      },
    })
    if (product) {
      throw new Error('该项目已存在')
    }

    const result = await ctx.model.Products.create({ ...body })
    await app.cache.del(cacheName)
    return result
  }

  /**
   * 批量创建项目
   */
  async batchCreate ({ list: productList }) {
    const { ctx, app } = this
    const products = await ctx.model.Products.bulkCreate(productList)
    await app.cache.del(cacheName)
    return products
  }

  /**
   * 通过ID查项目
   * @param body
   */
  async findProductById (body: IdParams) {
    const { ctx } = this
    const { id } = body
    const result = await ctx.model.Products.findByPk(decodeId(id))
    return result
  }

  /**
   * 更新产品
   * @param id  产品ID
   * @param body
   */
  async update (id: number, body: ProductItem) {
    const { ctx, app } = this
    const product = await ctx.model.Products.findByPk(decodeId(id))
    if (!product) {
      throw new Error('未找到该产品')
    }
    await app.cache.del(cacheName)
    return product.update({ ...body })
  }

  /**
   * 删除项目
   * @param id
   */
  async delete (id: number) {
    const { ctx, app } = this
    const result = await ctx.model.Products.destroy({
      where: {
        id: decodeId(id),
      },
    })
    await app.cache.del(cacheName)
    return result
  }

  /**
   * 关联后端项目
   * @param id 前端项目ID
   * @param endIds 后端项目ID Array
   */
  async addEndProducts ({ id, endIds }: { id: number; endIds: number[] }) {
    const { ctx, app } = this
    const product = await ctx.model.Products.findByPk(decodeId(id))
    if (!product) {
      throw new Error('未找到该项目！')
    }
    const endProducts = await ctx.model.EndProducts.findAll({
      where: {
        id: {
          [Op.in]: endIds,
        },
      },
    })
    if (endProducts.length !== endIds.length) {
      throw new Error('后端项目数据有误，某些项目可能被删除，请刷新后重试')
    }

    const result = await product.addEndProducts([...endProducts])
    await app.cache.del(cacheName)
    return result
  }
}

export interface ProductItem {
  id?: number
  alias?: string
  name?: string
  description?: string
  levelConfig?: string
  ownerName?: string
  ownerId?: number
  gitUrl?: string
  tecType?: number
  onlineUrl?: string
  preUrl?: string
  testUrl?: string
  appType?: number
  appGroup?: number
  isJenkins?: number
  nodeVersion?: string
}
