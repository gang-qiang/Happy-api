import { Service } from 'egg'
import * as Sequelize from 'sequelize'
import { Page, IdParams } from '../interface/index.d'
import common from '../utils/common'

const { Op } = Sequelize as any

export default class EndProductService extends Service {
  /**
   * 根据分页信息获取后端项目
   * @param body
   */
  async findAllEndProducts (body: Page) {
    const { ctx } = this
    const { pageNo, pageSize, name } = body
    const _page = pageNo ? Number(pageNo) : common.pageNo
    const _limit = pageSize ? Number(pageSize) : common.pageSize
    const where: any = {}
    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      }
    }
    const query = {
      offset: (_page - 1) * _limit,
      limit: _limit,
      where,
    }
    const result = await ctx.model.EndProducts.findAndCountAll(query)
    const response = {
      data: result?.rows || [],
      pageSize: _limit,
      pageNo: _page,
      total: result?.count || 0,
    }
    return response
  }

  /**
   * 创建后端项目
   */
  async create (body: EndProductItem) {
    const { ctx } = this
    const { name } = body || {}
    const product = await ctx.model.EndProducts.findOne({
      where: {
        name,
      },
    })
    if (product) {
      throw new Error('该项目已存在')
    }

    // todo 判断是否有项目拥有者
    const result = await ctx.model.EndProducts.create(body)
    return result
  }

  /**
   * 通过ID查项目
   * @param body
   */
  async findEndProductById (body: IdParams) {
    const { ctx } = this
    const { id } = body
    const result = await ctx.model.EndProducts.findByPk(id)
    return result
  }

  /**
   * 更新项目
   * @param id  产品ID
   * @param body
   */
  async update (id: number, body: EndProductItem) {
    const { ctx } = this
    if (!`${id}`) {
      throw new Error('请选择产品！')
    }
    const endProduct = await ctx.model.EndProducts.findByPk(id)
    if (!endProduct) {
      throw new Error('未找到该产品')
    }
    return endProduct.update({ ...body })
  }
}

export interface EndProductItem {
  id?: number
  alias?: string
  name?: string
  description?: string
  ownerName?: string
  ownerId?: number
  gitUrl?: string
  onlineUrl?: string
  preUrl?: string
  testUrl?: string
  isJenkins?: number
}
