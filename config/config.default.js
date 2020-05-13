/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  return {
    logger: {
        dir: path.join(appInfo.baseDir, 'logs'),
    },
    keys: appInfo.name + '_bihu123456',
    security: {
      csrf: {
        enable: false,
      },
    },
    middleware: ['error', 'tracer'],
    snowflake: {
      client: {
        machineId: 1,
        workerId: 1
      }
    }
  }
};
