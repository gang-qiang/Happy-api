export interface Page {
  id: number
  title: string
  [propName: string]: any
}
// export interface ReportPlatform {
//   browser: string // 浏览器名 + 版本
//   device: string // 设备名
//   os: string // 环境名 + 版本
//   user: string // ip ?
// }

export interface IdParams {
  id: number
}
