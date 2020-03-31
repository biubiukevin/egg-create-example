'use strict';

const Controller = require('egg').Controller;

class TrendController extends Controller {
        /**
     * @api {get} /v1/liveStream/:liveId/trend 直播分析数据变化
     * @apiName /v1/liveStreamBestSales 直播分析数据变化
     * @apiVersion 1.0.0
     * @apiDescription 直播分析数据变化
     * @apiGroup root
     *
     * @apiRequest 请求参数
     * @apiParam {string} liveId 淘宝直播id
     * @apiParam {string} [sort] 排序字段,默认采样时间time
     * @apiParam {string} [order] 排序 (ASC 升序(默认) / DESC 降序 )
     *
     * @apiExample
        [
            {
                "liveId": 257070454796,
                "totalJoinCount": 44,
                "views": 89,
                "likes": 0,
                "time": 1585028775
            },
            {
                "liveId": 257070454796,
                "totalJoinCount": 149,
                "views": 370,
                "likes": 402,
                "time": 1585028837
            },
            {
                "liveId": 257070454796,
                "totalJoinCount": 182,
                "views": 683,
                "likes": 1182,
                "time": 1585028899
            },
        ]
     *
     * @apiSuccess {number} liveId 淘宝直播id
     * @apiSuccess {number} totalJoinCount 总观看人数
     * @apiSuccess {number} views 当前观看人数
     * @apiSuccess {number} likes 当前点赞数
     * @apiSuccess {number} time 当前时间
     *
     */
    async get() {
        const { ctx, service, app } = this;
        const { params } = ctx;
        const { liveId } = params;
        
        const result = await service.v1.liveStreamData.findAll({
            where: {
                liveId
            },
            attributes: ['liveId', 'totalJoinCount', 'views', 'likes', 'time'],
            order: [['time', 'ASC']]
        });
        ctx.body = result;
    }
}

module.exports = TrendController;
