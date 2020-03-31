'use strict';
// const errorList = require('../typedef/errorCode');
const R = require('ramda');


module.exports = options => {
  return async function error(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.logger.error(JSON.stringify({query: ctx.request.query, body: ctx.request.body, params:ctx.params}), err.toString());
      if (err instanceof ctx.IError.CtxError) {
        const httpCode = err.httpCode;
        const errorCode = err.errorCode

        ctx.status = httpCode;
        ctx.type = 'application/json';
        ctx.body = {
          code: errorCode,
          message: err.message,
          err,
        };
      } else {
        if (ctx.app.isDev() || ctx.app.isTest()) {
          ctx.status = 500;
          ctx.type = 'application/json';
          ctx.body = {
            code: 5000000,
            message: '服务异常,请稍后重试',
            err: {
              stack: err.stack,
              messge: err.message
            },
          };
        } else {
          ctx.status = 500;
          ctx.type = 'application/json';
          ctx.body = {
            code: 5000000,
            message: '服务异常,请稍后重试',
          };
        }
      }
    }
  };
};
