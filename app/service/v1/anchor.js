'use strict';
const Service = require('egg').Service;

const fp = require('lodash/fp');
const _ = require('lodash');
const R = require('ramda');
const sequelize = require('sequelize');


class Anchor extends Service {

    async update(data, where, transaction) {
        const { app } = this;
        return await app.taobaoModel.Anchor.update(data, { where, transaction });
    }

    async findAll(params) {
        const { app } = this;
        const result = await app.taobaoModel.Anchor.findAll(params);
        return result;
    }

    async findOne(params) {
        const { app } = this;
        const result = await app.taobaoModel.Anchor.findOne(params);
        return result;
    }
}

module.exports = Anchor;