'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class SellerSalesService extends Service {
  async bestSellers(params) {
    const { app, service, ctx } = this;
    const { Op } = app.Sequelize;

    let { time, mode, paging, sort, order } = params;

    let serv;
    switch (mode) {
      case 'WEEKLY':
        serv = app.taobaoModel.LiveStreamSellerSalesWeekly
        break;
      case 'MONTHLY':
        serv = app.taobaoModel.LiveStreamSellerSalesMonthly
        break;
      case 'DAILY':
        serv = app.taobaoModel.LiveStreamSellerSalesDaily
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

module.exports = SellerSalesService;
