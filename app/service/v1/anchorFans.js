'use strict';

const Service = require('egg').Service;

class AnchorFansService extends Service {
    async fansInc(params) {
        const { app, service, ctx } = this;
        const { paging, mode, sort, order } = params;
        let {time} = params;
        
        let serv;
        switch (mode) {
          case 'WEEKLY':
            serv = app.taobaoModel.AnchorFansWeekly
            break;
          case 'MONTHLY':
            serv = app.taobaoModel.AnchorFansMonthly
            break;
          case 'DAILY':
            serv = app.taobaoModel.AnchorFansDaily
            break;
          default:
            break;
        }
        const lastTime = await serv.findOne({
          attributes: ['time'],
          order: [['time', 'DESC']],
        });
        const timeParam = ctx.helper.getTimeByMode(mode, time);
        if (parseInt(timeParam) > lastTime.time) {
          time = lastTime.time
        } else {
          time = timeParam
        }
        const result = await serv.findAndCountAll({
          where: {
            time
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          },
          include: [
            {
              model: app.taobaoModel.Anchor,
              as: 'anchor',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt', 'dataStatus']
              }
            }
          ],
          order: [[sort, order]],
          limit: paging.limit,
          offset: paging.offset
        });
        return result;
    }
}

module.exports = AnchorFansService;
