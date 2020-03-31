'use strict';
const os = require('os');
const defOb = require('../typedef/def');
const def = Symbol('Application#def');
const hostName = Symbol('Application#hostName');

module.exports = {
    get def() {
        // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
        if (!this[def]) {
            // 实际情况肯定更复杂
            this[def] = defOb;
        }
        return this[def];
    },
    get hostName() {
        if (!this[hostName]) {
            // 实际情况肯定更复杂
            this[hostName] = os.hostname();
        }
        return this[hostName];
    },
    isDev() {
        return this.config.env === 'development' || this.config.env === 'dev' || this.config.env === 'local'
    },
    isTest() {
        return this.config.env === 'testing' || this.config.env === 'test' || this.config.env === 'sit'
    },
    isProduction() {
        return this.config.env === 'production' || this.config.env === 'prod' || this.config.env === 'product'
    },

};
