/* eslint-disable camelcase */
// app.js

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
    // console.log(this.app.config);
    // this.app.config.env = 'testing'
    // 例如：参数中的密码是加密的，在此处进行解密
    //   this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
    // 例如：插入一个中间件到框架的 coreMiddleware 之间
    //   const statusIdx = this.app.config.coreMiddleware.indexOf('status');
    //   this.app.config.coreMiddleware.splice(statusIdx + 1, 0, 'limit');
  }

  async didLoad() {
    //   app
    if (this.app.config.env === 'local') {
      // await this.app.taobaoModel.sync({ force: false });
    }
  }

  async willReady() {

  }

  async didReady() {
    //
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

    //   this.app.server.on('timeout', socket => {
    // handle socket timeout
    //   });
  }
}

module.exports = AppBootHook;
