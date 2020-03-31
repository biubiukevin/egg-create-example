'use strict';

const Controller = require('egg').Controller;

class AnchorFansIncController extends Controller {
  /**
 * @api {get} /v1/anchorFansInc 粉丝增长榜
 * @apiName /v1/anchorFansInc 粉丝增长榜
 * @apiVersion 1.0.0
 * @apiDescription 粉丝增长榜
 * @apiGroup root
 *
 * @apiRequest 请求参数
 * @apiParam {string} [time] 时间 例如 1572969600,1573055999
 * @apiParam {string} [mode] 榜单类型 例如 DAILY 日榜(默认) / WEEKLY 周榜 / MONTHLY 月榜
 * @apiParam {int} [pageNum] 页码
 * @apiParam {int} [pageSize] 每页几条
 * @apiParam {string} [sort] 排序字段,默认粉丝数
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
            "id": "6648818057542227941",
            "anchorId": "1161832800096251002",
            "inc": 35402,
            "fans": 37812271,
            "updateTime": 1585202428,
            "time": 20200325,
            "anchor": {
                "id": "1161832800096251002",
                "userId": 880734502,
                "priority": null,
                "name": "跟着松鼠吃零食",
                "fans": 37812271,
                "memo": "1.今天饲养员带来爆款新品单品优惠券哦，左上角亲密度领券，分开下单更加优惠哦~\n2.左上角点击【关注】账号，抢先了解更多粉丝福利哦！关注后下单可参与直播间内抽奖，新品爆款零食等你来拿~\n3.记得右下角点开播提醒哦~",
                "avatar": "img.alicdn.com/imgextra/i3/880734502/TB2a8lEomhlpuFjSspkXXa1ApXa_!!880734502-0-beehive-scenes.jpg",
                "shopUrl": "shop.m.taobao.com/shop/shop_index.htm?user_id=880734502",
                "wangwangLink": "im.m.taobao.com/ww/ad_ww_dialog.htm?to_user=uPrXxcvJyvOz1MHjyrM%3D",
                "userType": "daren",
                "roomId": 128581,
                "region": "芜湖",
                "taoke": true,
                "hasShop": false,
                "bizCode": "TMALL"
            }
        },
    ]
}
 *
 * @apiSuccess {string} anchorId 主播id
 * @apiSuccess {number} inc 粉丝增长数量
 * @apiSuccess {number} fans 粉丝数量
 * @apiSuccess {number} updateTime 更新时间
 * @apiSuccess {number} time 榜单时间
 * @apiSuccess {json} anchor 主播信息
 * @apiSuccess {string} anchor.id 主播id
 * @apiSuccess {number} anchor.userId 主播淘宝id
 * @apiSuccess {string} anchor.name 主播名称
 * @apiSuccess {number} anchor.fans 主播粉丝数
 * @apiSuccess {string} anchor.memo 主播简介
 * @apiSuccess {string} anchor.avatar 主播头像
 * @apiSuccess {string} anchor.wangwangLink 旺旺链接
 * @apiSuccess {string} anchor.userType 主播类型
 * @apiSuccess {number} anchor.roomId 直播间id
 * @apiSuccess {string} anchor.region 地区
 * @apiSuccess {boolean} anchor.taoke 是否为淘客
 * @apiSuccess {boolean} anchor.hasShop 有无店铺
 * @apiSuccess {string} anchor.bizCode 平台代码
 *
 */
  async get() {
    const { ctx, service, app } = this;
    const { query } = ctx.request;
    const paging = ctx.helper.paging(query, true);
    const sort = query.sort || 'fans';
    const order = query.order || 'DESC'
    const mode = query.mode || 'DAILY';
    const time = query.time;

    const result = await service.v1.anchorFans.fansInc({
      paging, sort, order, mode, time
    })
    ctx.body = ctx.helper.pagingData(result, paging);

  }
}

module.exports = AnchorFansIncController;
