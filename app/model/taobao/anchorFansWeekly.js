"use strict";

module.exports = app => {
  const DataTypes = app.Sequelize;
  const AnchorFansWeekly = app.taobaoModel.define('anchorFansWeekly', {
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
    inc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    fans: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    updateTime: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        field: 'update_time'
    },
    time: {
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
      tableName: 'anchor_fans_weekly',
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
      indexes: [
        {
            name: 'index_anchor_id_time',
            type: 'UNIQUE',
            fields: ['anchor_id', 'time']
        }
    ]
    });
    AnchorFansWeekly.associate = () => {
        app.taobaoModel.AnchorFansWeekly.belongsTo(app.taobaoModel.Anchor, {as: 'anchor', foreignKey: 'anchorId', targetKey: 'id'});
    }
    return AnchorFansWeekly;
}
