'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {
    /**
     * @api {get} /v1/liveStream/:liveId/goods 获取直播商品
     * @apiName /v1/liveStream/:liveId/goods 获取直播商品
     * @apiVersion 1.0.0
     * @apiDescription 获取直播商品
     * @apiGroup root
     *
     * @apiRequest 请求参数
     * @apiParam {int} [pageNum] 页码
     * @apiParam {int} [pageSize] 每页几条
     * @apiParam {string} [sort] 排序字段,默认totalSales
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
            "id": 43660,
            "userId": 776151038,
            "liveId": 256808737821,
            "itemId": 609609937006,
            "platformTitle": "稚优泉无惧幻想唇釉唇彩口红显白女学生平价丝绒雾面哑光不易掉色",
            "title": "稚优泉无惧幻想唇釉唇彩口红显白女学生平价丝绒雾面哑光不易掉色",
            "productUrl": "i.click.taobao.com/t?e=m%3D2%26s%3DA27h%2BhZyvnNw4vFB6t2Z2ueEDrYVVa64gze6kOnl9rUYX8TY%2BNEwd9dYW1iSSM9%2FJ%2BAVY%2F4wKC258DrNewrBVxCWn%2BktVDhAew25dLtyFKnNr%2BS%2FwP8clzTbnF6Hwy6EFOrnhn7Q%2BFuFqDYz6zjAn3WOPQ9kRdh76TA6%2Blj5WkbUrmoEuK%2BHflLg1fej4jpZ%2B%2FpOOssglxpygEfSaz3mewPGvQeqcSAa&liveInfo=776151038~256808737821",
            "platformImage": "//gw.alicdn.com/bao/uploaded/i2/776151038/O1CN01EKw4Pt1JXRhqiebYd_!!776151038-0-lubanu-s.jpg",
            "images": "img.alicdn.com/imgextra/i2/776151038/O1CN01EKw4Pt1JXRhqiebYd_!!776151038-0-lubanu-s.jpg",
            "price": "59.90",
            "sellerId": 69288732,
            "categoryId": 0,
            "rootCategoryId": 50010788,
            "oneCategory": "香水",
            "twoCategory": "",
            "soldNum": 685,
            "totalSales": "41031.50"
        },  
        ]
      }
     *
     * @apiSuccess {string} id 商品id
     * @apiSuccess {number} userId 主播淘宝id
     * @apiSuccess {number} liveId 淘宝直播id
     * @apiSuccess {number} itemId 商品淘宝id
     * @apiSuccess {string} platformTitle 淘宝商品标题
     * @apiSuccess {string} title 商品标题
     * @apiSuccess {string} liveUrl 直播地址
     * @apiSuccess {string} productUrl 商品地址
     * @apiSuccess {string} platformImage 商品封面
     * @apiSuccess {string} images 详情图
     * @apiSuccess {string} price 商品价格
     * @apiSuccess {number} sellerId 卖家淘宝id
     * @apiSuccess {number} categoryId 二级分类id
     * @apiSuccess {number} rootCategoryId 一级分类id
     * @apiSuccess {string} oneCategory 一级类目
     * @apiSuccess {string} twoCategory 二级类目
     * @apiSuccess {number} soldNum 总销量
     * @apiSuccess {string} totalSales 销售额
     *
     */
    async get() {
        const { ctx, service, app } = this;
        const { params } = ctx;
        const { query } = ctx.request;

        const paging = ctx.helper.paging(query, true);
        const sort = query.sort || 'totalSales';
        const order = query.order || 'DESC';
        const { liveId } = params

        const result = await service.v1.itemsInfo.findAll({ 
            where: {
                liveId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt', 'liveStartDate', 'platformPrice', 'originalPrice', 'brandvalueId']
            },
            limit: paging.limit,
            offset: paging.offset,
            order: [[sort, order]]
        });

        ctx.body = ctx.helper.pagingData(result, paging);
    }
}

module.exports = GoodsController;
