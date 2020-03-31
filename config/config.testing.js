/* eslint valid-jsdoc: "off" */

'use strict';

const operatorsAliases = require('sequelize').Op;
const etcd = require('./etcd.json');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const MYSQL_TAOBAO_DBNAME = process.env.MYSQL_TAOBAO_DBNAME_WRITE || etcd.KANKANTAOBAO_MYSQL_DBNAME

const MYSQL_TAOBAO_HOST_WRITE = process.env.MYSQL_TAOBAO_HOST_WRITE || etcd.KANKANTAOBAO_WRITE_MYSQL_HOST  // '192.168.10.223';
const MYSQL_TAOBAO_PORT_WRITE = process.env.MYSQL_TAOBAO_PORT_WRITE || etcd.KANKANTAOBAO_MYSQL_PORT  // 3306;
const MYSQL_TAOBAO_USERNAME_WRITE = process.env.MYSQL_TAOBAO_USERNAME_WRITE || etcd.KANKANTAOBAO_WRITE_MYSQL_USERNAME  // 'bihurw';
const MYSQL_TAOBAO_PASSWORD_WRITE = process.env.MYSQL_TAOBAO_PASSWORD_WRITE || etcd.KANKANTAOBAO_WRITE_MYSQL_PASSWORD  // 'bihu123456';

const MYSQL_TAOBAO_HOST_READ = process.env.MYSQL_TAOBAO_HOST_READ || etcd.KANKANTAOBAO_READ_MYSQL_HOST  // '192.168.10.223';
const MYSQL_TAOBAO_PORT_READ = process.env.MYSQL_TAOBAO_PORT_READ || etcd.KANKANTAOBAO_MYSQL_PORT // 3306;
const MYSQL_TAOBAO_USERNAME_READ = process.env.MYSQL_TAOBAO_USERNAME_READ || etcd.KANKANTAOBAO_READ_MYSQL_USERNAME  // 'bihurw';
const MYSQL_TAOBAO_PASSWORD_READ = process.env.MYSQL_TAOBAO_PASSWORD_READ || etcd.KANKANTAOBAO_READ_MYSQL_PASSWORD  // 'bihu123456';


module.exports = appInfo => {
  return {
    cluster: {
      listen: {
        port: 60030,
      },
    },
    sequelize: {
      datasources: [
        {
          dialect: 'mysql',
          delegate: 'taobaoModel',
          baseDir: 'model/taobao',
          database: MYSQL_TAOBAO_DBNAME,
          logQueryParameters: true,
          replication: {
            read: [
              {
                database: MYSQL_TAOBAO_DBNAME,

                host: MYSQL_TAOBAO_HOST_READ,
                port: MYSQL_TAOBAO_PORT_READ,
                username: MYSQL_TAOBAO_USERNAME_READ,
                password: MYSQL_TAOBAO_PASSWORD_READ,
              }
            ],
            write: {
              database: MYSQL_TAOBAO_DBNAME,

              host: MYSQL_TAOBAO_HOST_WRITE,
              port: MYSQL_TAOBAO_PORT_WRITE,
              username: MYSQL_TAOBAO_USERNAME_WRITE,
              password: MYSQL_TAOBAO_PASSWORD_WRITE,
            }
          },
          freezeTableName: false,
          underscored: true,
          operatorsAliases,
          timezone: '+08:00',
        }
      ]
    },
  }
};
