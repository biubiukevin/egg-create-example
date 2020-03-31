'use strict';
const Service = require('egg').Service;

class LiveStream extends Service {

    async findOne(params) {
        const result = await this.app.taobaoModel.LiveStream.findOne(params);
        return this.ctx.helper.taobaoReplayUrl(result)
    }
    async findAll(params, needCount = false) {
        if (needCount) {
            const result = await this.app.taobaoModel.LiveStream.findAndCountAll(params);
            let row = this.ctx.helper.rows(result);
            result.row = row.map(this.ctx.helper.taobaoReplayUrl)
            return result;
        } else {
            return await this.app.taobaoModel.LiveStream.findAll(params);
        }
    }
}

module.exports = LiveStream;