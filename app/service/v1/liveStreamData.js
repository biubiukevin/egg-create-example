'use strict';

const Service = require('egg').Service;

class LiveStreamDataService extends Service {
  async findAll(params, needCount = false) {
    if(needCount) {
        return this.app.taobaoModel.LiveStreamData.findAndCountAll(params);
    } else {
        return this.app.taobaoModel.LiveStreamData.findAll(params);
    }
  }
}

module.exports = LiveStreamDataService;
