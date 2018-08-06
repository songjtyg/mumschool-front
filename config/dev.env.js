'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKSTAGE_HOST:'"http://mumschool.ngrok.xiaomiqiu.cn"',
  //BACKSTAGE_HOST:'"http://localhost"',
  FRONT_HOST:'"http://mumschool-front.ngrok.xiaomiqiu.cn"',
  WECHAT_APP_ID:'"wx33c840e0ffad7c2e"',
})
