'use strict';


'use strict';

const errorCode = {
    'SERVER_ERROR': 50000000,
    'LIST_EMPTY': 50000001,
    'ANCHOR_NOT_FOUNT': 50000002,
    'LIVESTREAM_NOT_FOUND': 50000003,
    'NOTLOGINYET': 50000004,
    'PARAMETER_ERROR': 50000005,
    'GOODS_NOT_EXIST': 50000006,
    'TKL_ERROR': 50000007,
}
const errorInfo = { 
    'SERVER_ERROR': '服务异常,请稍后重试',
    'LIST_EMPTY': '商品列表为空',
    'ANCHOR_NOT_FOUNT': '主播未找到',
    'LIVESTREAM_NOT_FOUND': '直播未找到',
    'NOTLOGINYET': '未登录',
    'PARAMETER_ERROR': '参数错误',
    'GOODS_NOT_EXIST': '商品不存在',
    'TKL_ERROR': '淘口令错误'
}

class CtxError extends Error{
    constructor(httpCode, errorAlias, message, err) {
        super(message);
        this.httpCode = httpCode || 500;
        this.errorAlias = errorAlias || 'SERVER_ERROR';
        this.errorCode = errorCode[errorAlias];
        this.message = message || errorInfo[errorAlias] || errorInfo['SERVER_ERROR'];
        this.err = err;
    }
    toString() {
        return `${this.httpCode} ${this.errorCode} ${this.message} ${this.err ? this.err.message : ''}`
    }
}

module.exports = {
    CtxError
};