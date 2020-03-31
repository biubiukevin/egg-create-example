'use strict';

const Controller = require('egg').Controller;
const R = require('ramda');

class LiveStreamController extends Controller {
    /**
     * @api {get} /v1/anchor/:id/liveStream 获取主播直播列表
     * @apiName /v1/anchor/:id/liveStream 获取主播直播列表
     * @apiVersion 1.0.0
     * @apiDescription 获取主播直播列表
     * @apiGroup root
     *
     * @apiRequest 请求参数
     * @apiParam {string} [date] 开播时间区间 20200312,20200325
     * @apiParam {number} [pageNum] 页码
     * @apiParam {number} [pageSize] 分页大小
     * @apiParam {string} [sort] 排序字段
     * @apiParam {string} [order] 排序 (ASC 升序 / DESC 降序(默认) )
     * @apiExample
    {
      "paging": {
          "count": 366,
          "pageNum": 1,
          "pageSize": 10
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
            "sales": "0.00"
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
     *
     */
    async get() {
        const { ctx, service, app } = this;
        const { Op } = app.Sequelize;
        const { query } = ctx.request;
        const { params } = ctx;
        const { id } = params;
        const date = query.date ? query.date.split(',') : null;
        const paging = ctx.helper.paging(query, true);
        const sort = query.sort || 'startTime';
        const order = query.order || 'DESC';
        const result = await service.v1.liveStream.findAll({
            where: R.mergeAll([
                {
                    anchorId: id,
                    stopTime: { [Op.ne]: null }
                },
                date && date.length == 2 ? { date: { [Op.between]: date } } : {},
            ]),
            order: [[sort, order]],
            limit: paging.limit,
            offset: paging.offset,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
        }, true);

        ctx.body = ctx.helper.pagingData(result, paging)
    }
}

module.exports = LiveStreamController;
