'use strict';


const Controller = require('egg').Controller;


class LiveStreamBestSales extends Controller {
    /**
     * @api {get} /v1/liveStreamBestSales 热销商品榜
     * @apiName /v1/liveStreamBestSales 热销商品榜
     * @apiVersion 1.0.0
     * @apiDescription 热销商品榜
     * @apiGroup root
     *
     * @apiRequest 请求参数
     * @apiParam {string} [time] 时间 例如 1572969600,1573055999
     * @apiParam {string} [mode] 榜单类型 例如 DAILY 日榜(默认) / WEEKLY 周榜 / MONTHLY 月榜
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
                "id": "6648401731942154240",
                "time": 20200324,
                "sellerCount": 1,
                "liveCount": 2,
                "itemId": 612634252693,
                "title": "【王一博同款 抢先加购】红米k30pro 3月24日Redmi旗舰新品发布会智能游戏5g手机小米官方旗舰店正品xiaomi",
                "productUrl": "i.click.taobao.com/t?e=m%3D2%26s%3DLH%2BX5U6RBCNw4vFB6t2Z2ueEDrYVVa64gze6kOnl9rUYX8TY%2BNEwd9mJQHJP8ljbxqmPbz6xcicNkypX71N4iCuW%2FC2w1QGZZQJ0mUueQva6nfDPqCoh6letILtk60cF4B6vsPijX7DlW08BvtKVQXWOPQ9kRdh7hsS8YjFyMfBXrSC7ZOtHBSvdhfmE%2B91BbcxOcXXKfgNm6t2fiCfqLTHw7LWZQioI&liveInfo=1714128138~256810612299",
                "images": "img.alicdn.com/imgextra/i2/1714128138/O1CN01ObFQEo29zFlwxLa7s_!!0-item_pic.jpg",
                "oneCategory": "",
                "twoCategory": "",
                "price": "999999.00",
                "soldNum": 3776,
                "sales": "3775996224.00"
            },
        ]
    }
     *
     * @apiSuccess {string} time 时间
     * @apiSuccess {string} sellerCount 关联主播数量
     * @apiSuccess {string} liveCount 关联直播数量
     * @apiSuccess {string} itemId 商品淘宝id
     * @apiSuccess {string} title 标题
     * @apiSuccess {string} productUrl 商品链接
     * @apiSuccess {string} images 商品图片
     * @apiSuccess {string} oneCategory 一级分类
     * @apiSuccess {string} twoCategory 二级分类
     * @apiSuccess {string} price 单价
     * @apiSuccess {string} soldNum 总销量
     * @apiSuccess {string} sales 总销售额
     *
     */
    async get() {
        const { ctx, service, app } = this;
        const { query } = ctx.request;

        const mode = query.mode || 'DAILY';
        const paging = ctx.helper.paging(query, true);

        const sort = query.sort || 'sales';
        const order = query.order || 'DESC'
        const time = query.time || null;

        const result = await service.v1.goodsSales.bestGoods({
            mode, time, sort, order, paging
        });

        ctx.body = ctx.helper.pagingData(result, paging);
    }
}

module.exports = LiveStreamBestSales;