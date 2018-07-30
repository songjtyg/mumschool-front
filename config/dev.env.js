'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKSTAGE_HOST:'"http://mumschool.ngrok.xiaomiqiu.cn"',
  FRONT_HOST:'"http://mumschool-front.ngrok.xiaomiqiu.cn"',
  //BACKSTAGE_HOST:'"http://localhost:80"'
})
