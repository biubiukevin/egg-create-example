'use strict';

const Service = require('egg').Service;

class GoodsSalesService extends Service {
    async bestGoods(params) {
        const { app, service, ctx } = this;
        const { paging, mode, time, sort, order } = params;

        let serv;
        switch (mode) {
            case 'WEEKLY':
                serv = app.taobaoModel.LiveStreamGoodsSalesWeekly
                break;
            case 'MONTHLY':
                serv = app.taobaoModel.LiveStreamGoodsSalesMonthly
                break;
            case 'DAILY':
                serv = app.taobaoModel.LiveStreamGoodsSalesDaily
                break;
            default:
                break;
        }

        const result = await serv.findAndCountAll({
            where: {
                time: ctx.helper.getTimeByMode(mode, time)
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
            limit: paging.limit,
            offset: paging.offset,
            order: [[sort, order]]
        });
        // const row = ctx.helper.rows(result);
        // const itemsInfo = await app.taobaoModel.ItemsInfo.findAll({
        //     where: {
        //         liveStartDate: ctx.helper.getDefaultTimeRange({ mode }),
        //         itemId: row.map(ob => { return ob.itemId })
        //     },
        //     attributes: ['itemId'],
        //     include: [
        //         {
        //             model: app.taobaoModel.Anchor,
        //             as: 'anchor',
        //             attributes: {
        //                 exclude: ['createdAt', 'updatedAt', 'deletedAt', 'dataStatus']
        //             }
        //         }
        //     ]
        // });
        // const itemSeller = R.groupBy(R.prop('itemId'))(itemsInfo);
        // result.row = row.map(ob => {
        //     ob.sellerList = [];
        //     const obSeller = itemSeller[ob.itemId];
        //     if(obSeller && obSeller.length) {
                
        //     }
        // })
        return result;
    }
}

module.exports = GoodsSalesService;
