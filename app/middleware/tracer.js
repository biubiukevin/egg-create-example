'use strict';
// const errorList = require('../typedef/errorCode');
const R = require('ramda');
const os = require('os');
const hostname = os.hostname();

module.exports = options => {
    return async function tracer(ctx, next) {
        ctx.tracer = {
            traceId: hostname + '-' + ctx.app.snowflake.next()
        }
        await next();
    };
};
