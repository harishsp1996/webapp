const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const scans = sequelize.define(
    'scans',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

status: {
        type: DataTypes.ENUM,

        values: [

"Pending",

"Running",

"Completed"

        ],

      },

start_time: {
        type: DataTypes.DATE,

      },

git_url: {
        type: DataTypes.TEXT,

      },

git_username: {
        type: DataTypes.TEXT,

      },

git_password: {
        type: DataTypes.TEXT,

      },

server_ip: {
        type: DataTypes.TEXT,

      },

app_urls: {
        type: DataTypes.TEXT,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  scans.associate = (db) => {

    db.scans.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.scans.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return scans;
};

