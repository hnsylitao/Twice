# Twice `React Project`

# FullStack
+ `webpack babel eslint`
+ `react react-router react-redux`
+ `andt`

# Scripts
**install**
```js
$ npm install
```
**start**
```js
//run dev
$ npm run start
//run test
$ npm run test
//run prod
$ npm run prod
```
**build**
```js
// build dev
$ npm run build-dev
// build test
$ npm run build-test
// build prod
$ npm run build-prod
```

# 项目结构

```
.
├── .babelrc
├── .eslintrc
├── .gitignore
├── README.md
├── build
│   ├── build.js
│   ├── config
│   │   ├── base.js
│   │   ├── dev.js
│   │   ├── dev.server.js
│   │   ├── dll.js
│   │   ├── prod.js
│   │   └── test.js
│   ├── dev.js
│   ├── dll
│   │   └── base.config.js
│   ├── plugins
│   │   └── HtmlWebpackStatic.js
│   └── public
├── package.json
└── src
    ├── app.js
    ├── app.less
    ├── assets
    ├── components
    ├── config
    │   ├── base.js
    │   ├── dev.js
    │   ├── prod.js
    │   └── test.js
    ├── const
    ├── dll
    ├── index.html
    ├── redux
    ├── routes
    ├── services
    └── util

15 directories, 22 files
```


# 项目技术栈
`WebPack` `Es6` `ESlint` `HotMiddleWare` `ReactJs`
`Antd` `React-router` `Redux` `CssModules` 

### 项目亮点
1. 采用热替换 及 Dll 打包方式 开发环境中可以更高速的打包
2. 实现发布版本管控 做到每打包一个版本都有备份
3. Code Splitting 按需加载
4. Src 目录下的 less 采用cssModule 并且在 test、prod 打包下 emjoy命名