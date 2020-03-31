/*
 * 直播历史信息
 * */
"use strict";

module.exports = app => {
  const DataTypes = app.Sequelize;
  const LiveStreamData = app.taobaoModel.define('liveStreamData', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
    },
    liveStreamId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: 'live_stream_id',
      defaultValue: 0,
    },
    title: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: ''
    },
    liveId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: 'live_id',
      defaultValue: 0
    },
    totalJoinCount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'total_join_count',
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    likes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    time: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    date: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'live_stream_data',
    timestamps: true,
    paranoid: true,
    freezeTableName: true
  });

  return LiveStreamData;
}
