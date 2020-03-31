'use strict';

const Service = require('egg').Service;

class ItemsInfoService extends Service {
   async findAll(params, needCount = false) {
    if(needCount) {
        return await this.app.taobaoModel.ItemsInfo.findAll(params);
    } else {
        return await this.app.taobaoModel.ItemsInfo.findAndCountAll(params);
    }
  }
}

module.exports = ItemsInfoService;
