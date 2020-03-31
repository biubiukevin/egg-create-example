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
        // `Number` if 6-bit length (the default value),
        // we could handle servers from `2 ** 6` different machines.
        // And if 0, there will be no machine id in the uuid
        machineIdBitLength: 6,
        workerIdBitLength: 4,
        // Could handle max 4096 requests per millisecond
        serialIdBitLength: 12
      }
    }
  }
};
