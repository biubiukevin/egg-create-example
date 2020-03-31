"use strict";

module.exports = app => {
  const DataTypes = app.Sequelize;
  const AnchorStatistic = app.taobaoModel.define('anchorStatistic', {
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
    dailyInc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'daily_inc'
    },
    weeklyInc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
        field: 'weekly_inc'
    },
    monthlyInc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
        field: 'monthly_inc'
    },
    fans: {
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
      tableName: 'anchor_statistic',
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
      indexes: [
        {
            name: 'index_anchor_id',
            type: 'UNIQUE',
            fields: ['anchor_id']
        }
    ]
    });

    return AnchorStatistic;
}
