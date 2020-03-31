/*
 * 直播信息
 * */
"use strict";

module.exports = app => {
    const DataTypes = app.Sequelize;
    const LiveStream = app.taobaoModel.define('liveStream', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
        },
        anchorId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: "anchor_id",
            defaultValue: 0
        },
        liveId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: 'live_id',
            defaultValue: 0
        },
        title: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: ''
        },        
        replayUrl: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            field: 'replay_url',
            defaultValue: ''
        },
        liveUrl: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            field: 'live_url',
            defaultValue: ''
        },
        coverUrl: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: '',
            field: 'cover_url'
        },
        startTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'start_time',
            defaultValue: 0
        },
        stopTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'stop_time',
            defaultValue: 0
        },
        totalJoinCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'total_join_count'
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        date: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        duration: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue:0,
        },
        goodsNum: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'goods_num'
        },
        soldNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'sold_num'
        },
        sales: {
            type: DataTypes.DECIMAL(12,2),
            allowNull: false,
            defaultValue: 0,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at"
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "updated_at"
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: "deleted_at"
        }
    }, {
        tableName: 'live_stream',
        timestamps: true,
        paranoid: true,
        freezeTableName: true
    });

    LiveStream.associate = () => {
        app.taobaoModel.LiveStream.belongsTo(app.taobaoModel.Anchor, {as: "anchor", foreignKey: "anchorId"});
        app.taobaoModel.LiveStream.hasMany(app.taobaoModel.ItemsInfo, {as: "goods", foreignKey: "liveId", sourceKey: "liveId"})
    }

    return LiveStream;

}
