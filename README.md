# 前端错误监控系统+项目网

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ yarn
$ yarn dev
$ open http://localhost:7001/
```

### Requirement

- Node.js 14.x
- Typescript 2.8+

### 项目文件结构

```
├── Dockerfile
├── README.md
├── app
│   ├── contract               -根据 swagger 生成接口文档的规范，定义字段的具体类型 具体可参考 https://github.com/Yanshijie-EL/egg-swagger-doc
│   │   ├── dto.ts             -基础定义
│   │   ├── request            -request 字段定义
│   │   │   └── index.ts
│   │   └── response           -response 字段定义
│   │       └── index.ts
│   ├── controller             -controlle
│   ├── decorators             -自定义装饰器
│   │   ├── middleware.ts
│   │   └── router.ts
│   ├── interface              -公用 接口
│   │   └── index.d.ts
│   ├── middleware             -自定义中间件
│   │   ├── checkAuth.ts
│   │   └── errorHandler.ts
│   ├── model                  -model
│   ├── public
│   │   └── baseModel.ts
│   ├── router.ts              -router
│   ├── schedule               -定时任务
│   ├── service                -service
│   │   ├── abnormal.ts
│   │   ├── demands.ts
│   │   ├── endProducts.ts
│   │   ├── products.ts
│   │   └── users.ts
│   ├── utils                  -工具库
│   │   ├── common.ts          -常量枚举
│   │   ├── request.ts
│   │   └── utils.ts
│   └── validate               -数据校验层
│       ├── abnormal.ts
│       ├── index.ts
│       ├── products.ts
│       └── users.ts
├── app.ts
├── appveyor.yml
├── config
│   ├── config.default.ts
│   ├── config.local.ts
│   ├── config.prod.ts
│   ├── config.test.ts
│   ├── config.unittest.js
│   └── plugin.ts
├── coverage
├── database                    -数据库配置
│   ├── config.json
│   └── migrations
├── gitlab-ci
│   ├── deploy.sh
│   ├── fe-online.yaml
│   └── fe.yaml
├── init.sql                    -数据库初始化sql
├── jenkins-ci
├── logs
├── package-lock.json
├── package.json
├── run
├── start.sh
├── test
├── tsconfig.eslint.json
├── tsconfig.json
├── typings
├── yapi-import.json
├── yarn-error.log
└── yarn.lock

```

### 其他配置

- 在根目录下创建 database , 在该文件夹下创建 config.json ,基础内容如下：

```json
{
  "development": {
    "username": "qiming",
    "password": "081018",
    "database": "monitor",
    "host": "192.168.64.2",
    "dialect": "mysql",
    "operatorsAliases": false,
    "underscored": true,
    "timezone": "+08:00",
    "freezeTableName": true
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false,
    "underscored": true,
    "timezone": "+08:00",
    "freezeTableName": true
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false,
    "underscored": true,
    "timezone": "+08:00",
    "freezeTableName": true
  }
}
```

- 修改 config.json 中的 development 配置，填上自己的数据库连接参数
- 安装 elasticstic
- 启动 elasticstic

### 导出接口文档

项目安装了 egg-swagger-doc、yapi-cli ，在 controller 层严格按照 swagger 的规范编写注释。

1. 运行 yarn dev 开发环境运行项目时，会自动根据注释生成 swagger 接口文档, 可以在 http://127.0.0.1:7001/swagger-ui.html 访问
2. 运行 yarn yapi 将接口文档上传到 yapi



tips:
1. ctx.validate(rules, data) 是egg-validate提供的方法，入参是规则和要校验的数据
2. formData 入参会挂载在ctx.request.files里，formData的附加参数会在ctx.request.body里，并且重复会覆盖
