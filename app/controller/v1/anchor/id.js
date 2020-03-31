'use strict';

const Controller = require('egg').Controller;

class IdController extends Controller {
      /**
     * @api {get} /v1/anchor/:id 获取主播详情
     * @apiName /v1/anchor/:id 获取主播详情
     * @apiVersion 1.0.0
     * @apiDescription 获取主播详情
     * @apiGroup root
     *
     * @apiRequest 请求参数
     *
     * @apiExample
    {
        "id": 1160246820065956000,
        "userId": 1114511827,
        "priority": null,
        "name": "荣耀官方旗舰店",
        "fans": 24760223,
        "memo": "所有奖品将在确认收货后30个工作日内发出",
        "avatar": "img.alicdn.com/imgextra/i4/1114511827/O1CN01mdFPwk1PMo9O8EO2h_!!1114511827-0-beehive-scenes.jpg",
        "shopUrl": "shop.m.taobao.com/shop/shop_index.htm?user_id=1114511827",
        "wangwangLink": "im.m.taobao.com/ww/ad_ww_dialog.htm?to_user=yNnSq7nZt73G7L2iteo%3D",
        "userType": "daren",
        "roomId": 58600,
        "region": "杭州",
        "taoke": true,
        "hasShop": false,
        "bizCode": "TMALL"
    }
     *
     * @apiSuccess {string} id 主播id
     * @apiSuccess {number} userId 主播淘宝id
     * @apiSuccess {string} name 主播名称
     * @apiSuccess {number} fans 主播粉丝数
     * @apiSuccess {string} memo 主播简介
     * @apiSuccess {string} avatar 主播头像
     * @apiSuccess {string} region 地区
     *
     */
  async get() {
    const { ctx, service, app } = this;
    const {params} = ctx;
    const {id} = params;
    
    const result = await service.v1.anchor.findOne({
        where: {
            id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt', 'dataStatus']
        }
    });
    ctx.body = result;
  }
}

module.exports = IdController;
