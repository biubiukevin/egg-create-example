'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');
const R = require('ramda');
const _ = require('lodash');


class LiveStreamBestSellers extends Controller {
    /**
     * @api {get} /v1/liveStreamBestSellers 带货榜
     * @apiName /v1/liveStreamBestSellers 带货榜
     * @apiVersion 1.0.0
     * @apiDescription 带货榜
     * @apiGroup root
     *
     * @apiRequest 请求参数
     * @apiParam {string} [mode] 榜单类型 DAILY 日榜(默认) / WEEKLY 周榜 / MONTHLY 月榜
     * @apiParam {string} [time] 时间 例如1572969600,1573055999
     * @apiParam {int} [pageNum] 页码
     * @apiParam {int} [pageSize] 每页几条
     * @apiParam {string} [sort] 排序字段,默认销售额
     * @apiParam {string} [order] 排序 (ASC 升序 / DESC 降序(默认) )
     *
     * @apiExample
    {
        "paging": {
            "count": 1,
            "pageNum": 1,
            "pageSize": 10
        },
        "data": [
            {
                "id": "6648092910271135949",
                "time": 20200323,
                "anchorId": "1161882980098235013",
                "liveCount": 2,
                "sales": "266644498.00",
                "soldNum": 211632,
                "duration": 56032,
                "anchor": {
                    "id": "1161882980098235013",
                    "userId": 791105148,
                    "priority": null,
                    "name": "雪梨_Cherie",
                    "fans": 13264359,
                    "memo": "新款美衣小剧透！",
                    "avatar": "gw2.alicdn.com/tfscom/tuitui/TB1cvzTMXXXXXc8XFXXXXXXXXXX",
                    "shopUrl": "",
                    "wangwangLink": "im.m.taobao.com/ww/ad_ww_dialog.htm?to_user=0anA5l9DaGVyaWU%3D",
                    "userType": "daren",
                    "roomId": 53644,
                    "region": "杭州",
                    "taoke": true,
                    "hasShop": false,
                    "bizCode": "TAOBAO"
                }
            },
        ]
    }
     *
     * @apiSuccess {string} sales 销售额
     * @apiSuccess {string} anchorId 直播场次
     * @apiSuccess {string} time 榜单对应时间
     * @apiSuccess {string} soldNum 总销量
     * @apiSuccess {string} duration 直播总时长
     * @apiSuccess {number} liveCount 直播场次
     * @apiSuccess {json} anchor 主播信息
     * @apiSuccess {string} anchor.id 主播id
     * @apiSuccess {number} anchor.userId 主播淘宝id
     * @apiSuccess {string} anchor.name 主播名称
     * @apiSuccess {number} anchor.fans 主播粉丝数
     * @apiSuccess {string} anchor.memo 主播简介
     * @apiSuccess {string} anchor.avatar 主播头像
     * @apiSuccess {number} anchor.roomId 直播间号
     * @apiSuccess {string} anchor.region 地区
     * @apiSuccess {string} anchor.bizCode taobao/tmall
     *
     */
    async get(req, res) {
        const { ctx, app, service } = this;
        const query = req.query;
        const paging = ctx.helper.paging(query, true);
        const sort = query.sort || 'sales';
        const order = query.order || 'DESC';
        const time = query.time;
        const mode = query.mode || 'DAILY';

        const result = await service.v1.sellerSales.bestSellers({
            sort, order, time, mode, paging
        });

        ctx.body = ctx.helper.pagingData(result, paging);
    }
}

module.exports = LiveStreamBestSellers