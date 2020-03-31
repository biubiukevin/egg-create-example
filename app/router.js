'use strict';

const v1 = require('./routes/v1');
// const v2 = require('./routes/v2');
module.exports = app => {
  v1(app);
};
