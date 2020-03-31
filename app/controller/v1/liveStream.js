'use strict';
const Controller = require('egg').Controller;
const fp = require('lodash/fp');
const _ = require('lodash');
const R = require('ramda');
const moment = require('moment');

class LiveStream extends Controller {

    /**
     * @api {get} /v1/liveStream 获取直播列表
     * @apiName /v1/liveStream 获取直播列表
     * @apiVersion 1.0.0
     * @apiDescription 获取直播列表
     * @apiGroup root
     *
     * @apiRequest 请求参数
     * @apiParam {string} [time] 时间 例如 1572969600,1573055999
     * @apiParam {string} [mode] 榜单类型，日榜 "DAILY"/ 周榜 "WEEKLY"/ 月榜 "MONTHLY"，time参数存在时不生效
     * @apiParam {int} [pageNum] 页码
     * @apiParam {int} [pageSize] 每页几条
     * @apiParam {string} [sort] 排序字段,默认销量
     * @apiParam {string} [order] 排序 (ASC 升序 / DESC 降序(默认) )
     *
     * @apiExample
    {
      "paging": {
          "count": 366,
          "index": 1,
          "page": 10
      },
      "data": [
        {
            "id": 1170282240104863000,
            "anchorId": "1161834930096251019",
            "liveId": 257036143282,
            "title": "三彩品牌直播节入口",
            "replayUrl": "http://livenging.alicdn.com/mediaplatform/e4fc177c-637e-48f1-8c18-d1a0632d9a71.m3u8",
            "liveUrl": "http://liveng.alicdn.com/mediaplatform/e4fc177c-637e-48f1-8c18-d1a0632d9a71.flv?auth_key=1587400092-0-0-f940eec52e13e0b5d0a0c2c87a0d0172&viewer_id=0&trace_id=0b140f1a15848362241555844eb62b",
            "coverUrl": "img.alicdn.com/imgextra/i2/O1CN01AxQIlT1CBHE2cGIJt_!!0-tbCommonAudio.jpg",
            "startTime": 1584836184,
            "stopTime": null,
            "totalJoinCount": 41971,
            "views": 94415,
            "likes": 409872,
            "date": 20200322,
            "duration": 3600,
            "goodsNum": 48,
            "soldNum": 0,
            "sales": "0.00",
            "anchor": {
                "id": "1161834930096251019",
                "userId": 745475881,
                "name": "三彩设计师-ciya的城",
                "fans": 4963298,
                "memo": "1.福利款低至三折，下载淘宝直播APP把三彩直播间设置成最爱可享受21号0-2点【最爱粉丝专场】\n2.完成亲密度任务，截图给客服并发送“直播关注”，抽100元无门槛\n3.把直播间设置成最爱截图给客服，可领取10元无门槛\n",
                "avatar": "img.alicdn.com/imgextra/i2/745475881/O1CN011tJXjdJu7192qMh_!!745475881-0-beehive-scenes.jpg",
                "region": "中国"
            }
        },
        ]
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
        const { query } = ctx.request;
        const { Op } = app.Sequelize;
        const paging = ctx.helper.paging(query, true);
        const sort = query.sort || 'sales';
        const order = query.order || 'DESC';

        const result = await service.v1.liveStream.findAll({
            where: {
                date: ctx.helper.getDefaultTimeRange(query),
                stopTime: { [Op.ne]: null }

            },
            order: [[sort, order]],
            limit: paging.limit,
            offset: paging.offset,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
            include: [
                {
                    model: app.taobaoModel.Anchor,
                    as: 'anchor',
                    attributes: ['id', 'userId', 'name', 'fans', 'memo', 'avatar', 'region']
                }
            ],
        }, true);

        ctx.body = ctx.helper.pagingData(result, paging)
    }
}

module.exports = LiveStream;