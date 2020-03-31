/*
 * douyin播主信息
 * */
"use strict";

module.exports = app => {
  const DataTypes = app.Sequelize;
  const AnchorData = app.taobaoModel.define('anchorData', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true
    },
    anchorId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: 'anchor_id',
      defaultValue: 0,
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
    time: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValut: 0,
    },
    date: {
      type: DataTypes.INTEGER.UNSIGNED,
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
      tableName: 'anchor_data',
      timestamps: true,
      paranoid: true,
      freezeTableName: true
    });

    return AnchorData;
}
