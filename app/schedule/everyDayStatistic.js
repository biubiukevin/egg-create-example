'use strict';


const Subscription = require('egg').Subscription;


class DataStatistic extends Subscription {
    static get schedule() {
		return {
			cron: '0 0 6 ? * ?',
			type: 'worker', // worker 随机worker进程执行，all 全部worker进程执行
			immediate: false, //true 应用启动并 ready 后立刻执行一次这个定时任务
		};
	}

	async subscribe() {
		await this.service.v1.statistic.anchorFansDaily({mode: 'DAILY'})
		// //直播销售情况
		// await this.service.v1.statistic.liveStreamSales();
		// //带货榜
		// await this.service.v1.statistic.liveStreamSellers({mode: 'DAILY'});
		// //热销商品榜
		// await this.service.v1.statistic.liveStreamGoodsDaily({mode:'DAILY'});
	}
}

module.exports = DataStatistic;