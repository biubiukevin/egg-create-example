/*
 * taobao播主信息
 * */
"use strict";

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Anchor = app.taobaoModel.define('anchor',{
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true
    },
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "user_id",
      defaultValue: 0
    },
    priority: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: ""
    },
    fans: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    memo: {
      type: DataTypes.STRING(2048),
      defaultValue: ""
    },
    avatar: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      defaultValue: ""
    },
    shopUrl: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      defaultValue: '',
      field: 'shop_url'
    },
    wangwangLink: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      defaultValue: "",
      field: "wangwang_link"
    },
    userType: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '',
      field: 'user_type'
    },
    roomId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "room_id",
      defaultValue: 0
    },
    region: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ""
    },
    taoke: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    hasShop: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'has_shop',
      defaultValue: false
    },
    bizCode: {
      type: DataTypes.STRING(16),
      allowNull: false,
      field: "biz_code",
      defaultValue: ''
    },
    dataStatus: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      field: 'data_status'
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
    tableName: 'anchor',
    timestamps: true,
    paranoid: true,
    freezeTableName: true
  });


  return Anchor;
}