'use strict';

const Controller = require('egg').Controller;

class LiveIdController extends Controller {
    /**
     * @api {get} /v1/liveStream/:liveId 获取直播信息
     * @apiName /v1/liveStream/:liveId 获取直播信息
     * @apiVersion 1.0.0
     * @apiDescription 获取直播信息
     * @apiGroup root
     *
     * @apiRequest 请求参数
     *
     * @apiExample
    {
        "id": "1171350520104863011",
        "anchorId": 1161141620087972000,
        "liveId": 256808737821,
        "title": "稚优泉直播节抢先看～",
        "replayUrl": "http://livenging.alicdn.com/mediaplatform/3a58176f-db81-473c-b831-41f8f9c7d169.m3u8",
        "liveUrl": "http://liveng.alicdn.com/mediaplatform/3a58176f-db81-473c-b831-41f8f9c7d169.flv?auth_key=1587474729-0-0-a1faddc3bab68a07c910f08c5942cf16&viewer_id=0&trace_id=0b142ba515849430484827326ea5b0",
        "coverUrl": "img.alicdn.com/imgextra/i2/O1CN0111HzpA1w30OffCiZR_!!0-tbCommonAudio.jpg",
        "startTime": 1584943028,
        "stopTime": 1584961504,
        "totalJoinCount": 3304,
        "views": 20978,
        "likes": 106533,
        "date": 20200323,
        "duration": 18476,
        "goodsNum": 48,
        "soldNum": 1358,
        "sales": "79128.30",
        "anchor": {
            "id": 1161141620087972000,
            "userId": 776151038,
            "priority": null,
            "name": "稚优泉萌萌哒",
            "fans": 6350038,
            "memo": "手把手教化妆",
            "avatar": "img.alicdn.com/imgextra/i4/776151038/TB2OSKDsXooBKNjSZPhXXc2CXXa_!!776151038-0-beehive-scenes.jpg",
            "shopUrl": "shop.m.taobao.com/shop/shop_index.htm?user_id=776151038",
            "wangwangLink": "im.m.taobao.com/ww/ad_ww_dialog.htm?to_user=1snTxciqw8jDyN%2FV",
            "userType": "daren",
            "roomId": 53412,
            "region": "中国",
            "taoke": true,
            "hasShop": false,
            "bizCode": "TMALL",
            "dataStatus": "{\"userLastUpdate\": 1584893189, \"userRePlayData\": 1}"
        }
    }
     *
     * @apiSuccess {string} id 直播id
     * @apiSuccess {string} anchorId 主播id
     * @apiSuccess {string} title 直播标题
     * @apiSuccess {number} liveId 淘宝直播id
     * @apiSuccess {string} anchorId 主播id 
     * @apiSuccess {string} liveUrl 直播地址
     * @apiSuccess {string} replayUrl 重播地址
     * @apiSuccess {string} coverUrl 封面地址
     * @apiSuccess {number} startTime 开始时间
     * @apiSuccess {number} stopTime 结束时间
     * @apiSuccess {number} views 播放量
     * @apiSuccess {number} likes 点赞量
     * @apiSuccess {number} soldNum 商品销量
     * @apiSuccess {string} sales 商品销售额
     * @apiSuccess {number} date 直播日期
     * @apiSuccess {number} duration 直播时长,秒
     * @apiSuccess {number} goodsNum 上架商品数量
     * @apiSuccess {json} anchor 主播信息
     * @apiSuccess {string} anchor.id 主播id
     * @apiSuccess {number} anchor.userId 主播淘宝id
     * @apiSuccess {string} anchor.name 主播名称
     * @apiSuccess {number} anchor.fans 主播粉丝数
     * @apiSuccess {string} anchor.memo 主播简介
     * @apiSuccess {string} anchor.avatar 主播头像
     * @apiSuccess {string} anchor.region 地区
     *
     */
    async get() {
        const { ctx, service, app } = this;
        const { params } = ctx;

        const { liveId } = params;

        const result = await service.v1.liveStream.findOne({
            where: {
                liveId
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
            ]
        });
        ctx.body = result;
    }
}

module.exports = LiveIdController;
