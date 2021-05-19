import { Service } from 'egg'
import * as Sequelize from 'sequelize'
import { Page, IdParams } from '../interface/index.d'
import common from '../utils/common'

const { Op } = Sequelize as any
export default class DemandService extends Service {
  /**
   * 根据分页信息获取需求
   * @param body
   */
  async findAllDemands (body: Page) {
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
      include: [
        {
          attributes: ['id', 'name', 'alias'],
          model: ctx.model.Products,
        },
        {
          attributes: ['id', 'username', 'description'],
          model: ctx.model.Users,
        },
      ],
    }
    const result = await ctx.model.Demands.findAndCountAll(query)
    const response = {
      data: result?.rows || [],
      pageSize: _limit,
      pageNo: _page,
      total: result?.count || 0,
    }
    return response
  }

  /**
   * 创建需求
   */
  async create (body: DemandItem) {
    const { ctx } = this
    const result = await ctx.model.Demands.create(body)
    return result
  }

  /**
   * 通过ID查需求
   * @param body
   */
  async findEndProductById (body: IdParams) {
    const { ctx } = this
    const { id } = body
    const result = await ctx.model.Demands.findByPk(id)
    return result
  }

  /**
   * 更新需求
   * @param id  需求ID
   * @param body
   */
  async update (id: number, body: DemandItem) {
    const { ctx } = this
    if (!`${id}`) {
      throw new Error('请选择需求！')
    }
    const demand = await ctx.model.Demands.findByPk(id)
    if (!demand) {
      throw new Error('未找到该需求')
    }
    return demand.update({ ...body })
  }

  /**
   * 关联前端项目
   * @param id 需求项目ID
   * @param frontIds 前端项目ID Array
   */
  async addProducts ({ id, frontIds }: {id: number; frontIds: number[]}) {
    const { ctx } = this
    const demand = await ctx.model.Demands.findByPk(id)
    if (!demand) {
      throw new Error('未找到该需求！')
    }
    const frontProducts = await ctx.model.Products.findAll({
      where: {
        id: {
          [Op.in]: frontIds,
        },
      },
    })
    if (frontProducts.length !== frontIds.length) {
      throw new Error('前端项目数据有误，某些项目可能被删除，请刷新后重试')
    }

    const result = await demand.addProducts([...frontProducts])
    return result
  }

  /**
   * 关联用户
   * @param id 需求项目ID
   * @param userIds 用户ID Array
   */
  async addUsers ({ id, userIds }: {id: number; userIds: number[]}) {
    const { ctx } = this
    const demand = await ctx.model.Demands.findByPk(id)
    if (!demand) {
      throw new Error('未找到该需求！')
    }
    const users = await ctx.model.Users.findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    })
    if (users.length !== userIds.length) {
      throw new Error('用户数据有误，某些用户可能被删除，请刷新后重试')
    }

    const result = await demand.addUsers([...users])
    return result
  }
}

export interface DemandItem {
  id?: number
  name?: string
  description?: string
  PRDUrl?: string
  JIRAUrl?: string
  UIUrl?: string
  APIUrl?: string
}
