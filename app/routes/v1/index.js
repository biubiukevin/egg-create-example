'use strict';

module.exports = app => {
    const {router, controller} = app;

    router.get('/v1/liveStream', controller.v1.liveStream.get);
    router.get('/v1/liveStream/:liveId', controller.v1.liveStream.liveId.get);
    router.get('/v1/liveStream/:liveId/goods', controller.v1.liveStream.liveId.goods.get);
    router.get('/v1/liveStream/:liveId/trend', controller.v1.liveStream.liveId.trend.get)

    router.get('/v1/anchor/:id', controller.v1.anchor.id.get);
    router.get('/v1/anchor/:id/liveStream', controller.v1.anchor.id.liveStream.get);

    router.get('/v1/liveStreamBestSellers', controller.v1.liveStreamBestSellers.get);
    router.get('/v1/liveStreamBestSales', controller.v1.liveStreamBestSales.get);

    router.get('/v1/anchorFansInc', controller.v1.anchorFansInc.get);
}