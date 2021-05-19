import { Application } from 'egg'
import { InitRouter } from '@app/decorators/router'
import common from '@app/utils/common'

export default (app: Application): void => {
  InitRouter(app, common.api)
}
