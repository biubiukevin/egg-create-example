'use strict';
const R = require('ramda');
const iError = require('../../lib/error');
const IError = Symbol('Context#IError');


module.exports = {
  get ip() {
    return this.header['x-real-ip'] || this.header['X-Forwarded-For'] || this.request.ip;
  },
  // get tracer() {
  //   return {
  //     traceId: this.tracer.traceId
  //   }
  // },
  get IError() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[IError]) {
      // 实际情况肯定更复杂
      this[IError] = iError;
    }
    return this[IError];
  },
  urlMatch(method, path) {
    return this.request.methoczd === R.toUpper(method) && this.request.path === path;
  },
  /**
   * 重载ctx.throw
   * @param {number} httpCode httpcode
   * @param {string} errorCode 错误码
   * @param {string} message 错误信息
   * @param {obj} err error
   */
  throw(httpCode, errorCode, message, err) {
    throw new this.IError.CtxError(httpCode, errorCode, message, err);
  },
  success(httpCode, message) {
    this.status = httpCode || 200;
    this.body = {
      status: 'OK',
      message: message || 'success'
    }
  }
};
