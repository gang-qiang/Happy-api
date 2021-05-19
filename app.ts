import { Application, IBoot } from 'egg'
import * as path from 'path'

export default class FooBoot implements IBoot {
  private app: Application

  constructor (app: Application) {
    this.app = app
  }

  configWillLoad () {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
    // eslint-disable-next-line global-require
    require('module-alias/register')
  }

  configDidLoad () {
    // Config, plugin files have loaded.
  }

  async didLoad () {
    // All files have loaded, start plugin here.
  }

  async willReady () {
    // All plugins have started, can do some thing before app ready.
  }

  async didReady () {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    // 加载自定义参数校验规则
    const directory = path.join(this.app.config.baseDir, 'app/validate')
    this.app.loader.loadToApp(directory, 'validate')

    const client = path.join(this.app.config.baseDir, 'app/elasticsearch')
    this.app.loader.loadToApp(client, 'client')
  }

  async serverDidReady () {
    // Server is listening.
  }

  async beforeClose () {
    // Do some thing before app close.
  }
}
