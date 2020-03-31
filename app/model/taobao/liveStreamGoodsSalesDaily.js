'use strict';

module.exports = app => {
    const DataTypes = app.Sequelize;
    const LiveStreamGoodsSalesDaily = app.taobaoModel.define('liveStreamGoodsSalesDaily', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncreament: true,
        },
        time: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        sellerCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'seller_count'
        },
        liveCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'live_count'
        },
        itemId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'item_id'
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
        },
        productUrl: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: '',
            field: 'product_url'
        },
        images: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: '',
        },
        oneCategory: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'one_category'
        },
        twoCategory: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'two_category'
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        soldNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'sold_num'
        },
        sales: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            field: "created_at"
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at"
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: "deleted_at"
        }                                                                                                                                 
    }, {
        tableName: 'live_stream_goods_sales_daily',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        indexes: [
            {
                name: 'time_item_id_index',
                type: 'UNIQUE',
                fields: ['time', 'item_id']
            }
        ]
    });

    return LiveStreamGoodsSalesDaily;
}
