'use strict';

const Service = require('egg').Service;
const moment = require('moment');
const R = require('ramda');

class StatisticService extends Service {
    /**
     * 生成粉丝增长详情
     * @param {json} options 参数
     * @param {string} options.mode 榜单类型
     * @param {string} options.timeRange 时间区间（秒级时间戳， 起止时间用“,”连接）
     */
    async anchorFansDaily({ mode = 'DAILY', timeRange }) {
        const { app, service, ctx } = this;
        const { Op } = app.Sequelize;
        const range = ctx.helper.getDefaultTimeRange({ mode, time: timeRange })
        const date = range[Op.between];
        const anchorData = await app.taobaoModel.AnchorData.findAll({
            where: {
                date: {
                    [Op.between]: [date[0], parseInt(date[1]) + 1]
                }
            },
            attributes: ['fans', 'anchorId', 'date'],
            order: [['anchorId', 'ASC'], ['date', 'DESC']],
            // limit: 1000
        });
        const anchorDataGroup = R.groupWith((a, b) => a.anchorId === b.anchorId, anchorData);
        let newAnchorList = [], newStatisticList = [];
        for (let i = 0; i < anchorDataGroup.length; i++) {
            const anchor = anchorDataGroup[i];
            if (anchor.length >= 2) {
                const newAnchorFansDaily = {
                    id: app.snowflake.uuid(),
                    anchorId: R.head(anchor).get('anchorId'),
                    inc: R.head(anchor).get('fans') - R.last(anchor).get('fans'),
                    fans: R.head(anchor).get('fans'),
                    updateTime: moment().unix(),
                    time: ctx.helper.getTimeByMode(mode, timeRange)
                }
                const newAnchorStatistic = {
                    id: app.snowflake.uuid(),
                    anchorId: R.head(anchor).get('anchorId'),
                    dailyInc: R.head(anchor).get('fans') - R.last(anchor).get('fans'),
                }
                newAnchorList.push(newAnchorFansDaily)
                newStatisticList.push(newAnchorStatistic)

            }
        }
        await app.taobaoModel.AnchorFansDaily.bulkCreate(newAnchorList, {
            updateOnDuplicate: ['inc', 'updateTime', 'fans']
        });
        await app.taobaoModel.AnchorStatistic.bulkCreate(newStatisticList, {
            updateOnDuplicate: ['dailyInc']
        });
    }
}

module.exports = StatisticService;
