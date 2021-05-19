import { Controller } from 'egg'
import { SelfController, Get } from '@app/decorators/router'

/**
* @controller HomeController
*/

@SelfController('/home')
export default class HomeController extends Controller {
  /**
  * @summary
  * @description
  * @router get /
  */
  @Get('/')
  public async index () {
    const { ctx } = this
    ctx.body = 'hello'
  }
}
