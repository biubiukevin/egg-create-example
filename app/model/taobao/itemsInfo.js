'use strict';

module.exports = app => {
    const DataTypes = app.Sequelize;
    const ItemsInfo = app.taobaoModel.define('itemsInfo', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncreament: true,
        },
        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'user_id'
        },
        liveId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'live_id'
        },
        itemId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'item_id'
        },
        platformTitle: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            field: 'platform_title'
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
        platformImage: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: '',
            field: 'platform_image'
        },
        images: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: '',
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        platformPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            field: 'platform_price'
        },
        originalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            field: 'original_price'
        },
        sellerId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'seller_id'
        },
        categoryId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'category_id'
        },
        rootCategoryId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'root_category_id'
        },
        brandvalueId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'brandvalue_id'
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
        soldNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'soldnum'
        },
        totalSales: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0.00,
            field: 'total_sales'
        },
        liveStartDate: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: 'live_start_date'
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
        tableName: 'items_info',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
    });

    ItemsInfo.associate = () => {
        app.taobaoModel.ItemsInfo.belongsTo(app.taobaoModel.LiveStream, {as: 'liveStream', foreignKey: 'liveId', targetKey: 'liveId'})
        app.taobaoModel.ItemsInfo.belongsTo(app.taobaoModel.Anchor, {as: 'anchor', foreignKey: 'userId', targetKey: 'userId'})
    }
    return ItemsInfo;
}
