'use strict';
const R = require('ramda');
const fp = require('lodash/fp');
const moment = require('moment');
const Op = require('sequelize').Op;

module.exports = {
  taobaoReplayUrl(row) {
    const uuid = R.match(/\w{8}(-\w{4}){3}-\w{12}/, row.replayUrl);
    row.replayUrl = "https://taobaolive.taobao.com/room/index.htm?feedId=" + uuid[0]

    return row
  },
  paging(params, def = true) {
    if (!def && !params.pageNum) {
      return null;
    }

    const pageNum = parseInt(params.pageNum) || 1;
    const pageSize = params.pageSize ? parseInt(params.pageSize) : 10;

    const skip = (pageNum - 1) * pageSize;
    return {
      limit: pageSize,
      offset: skip,
      pageNum,
      pageSize,
    };
  },
  parameterCheck(parameters, checklist) {
    if (!parameters || !checklist) {
      log.error('parameters or checklist null');
      return false;
    }

    return fp.every(checkItem => checkItem.indexOf('|') ?
      fp.find(a => fp.has(a)(parameters))(checkItem.split('|'))
      : fp.has(checkItem)(parameters))(checklist);
  },
  pagingData(...arrays) {
    if (fp.compact(arrays).length < 2) {
      return fp.head(fp.compact(arrays));
    }

    const paging = fp.last(arrays);
    if (arrays.length === 3) {
      return {
        paging: {
          count: fp.head(arrays),
          pageNum: paging.pageNum,
          pageSize: paging.pageSize,
        },
        data: fp.nth(1)(arrays)
      };
    }
    else if (arrays.length === 2) {
      const result = fp.head(arrays);

      const count = fp.getOr(result.length)('count')(result);
      if (count === null) {
        return fp.getOr([])('rows')(result);
      }

      const slice = (paging, rows) => R.slice(paging.offset, paging.offset + paging.pageSize, rows);
      return {
        paging: {
          count,
          pageNum: paging.pageNum,
          pageSize: paging.pageSize,
        },
        data: fp.getOr(slice(paging, result))('rows')(result)
      }
    }
  },
  booleanConvert: (value) => {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return value;
    }
  },
  rows(result) {
    return fp.getOr(fp.getOr(result)('data')(result))('rows')(result)
  },
  plain(data) {
    if (!data) {
      return data
    }
    return data.toJSON ? data.toJSON() : data
  },
  getDefaultTimeRange(query) {
    const time = R.propOr(null, 'time')(query);
    const mode = R.propOr(null, 'mode')(query);
    if (time) {
      const range = time.split(',');
      if (range.length == 2) {
        return { [Op.between]: [moment.unix(R.head(range)).format('YYYYMMDD'), moment.unix(R.last(range)).format('YYYYMMDD')] }
      }
    }
    switch (mode) {
      case 'WEEKLY':
        const thisWeek = moment().subtract(1, 'weeks');
        return { [Op.between]: [thisWeek.startOf('week').format('YYYYMMDD'), thisWeek.endOf('week').format('YYYYMMDD')] }
      case 'MONTHLY':
        const thisMonth = moment().subtract(1, 'months');
        return { [Op.between]: [thisMonth.startOf('month').format('YYYYMMDD'), thisMonth.endOf('month').format('YYYYMMDD')] }
      case 'DAILY':
      default:
        const thisDay = moment().subtract(1, 'days');
        return { [Op.between]: [thisDay.startOf('day').format('YYYYMMDD'), thisDay.endOf('day').format('YYYYMMDD')] }
    }
  },
  getTimeByMode(mode = 'DAILY', time) {
    if (time) {
      const timeRange = time.split(',');

      switch (mode) {
        case 'WEEKLY':
          if (parseInt(R.head(timeRange)) > moment().subtract(1, 'weeks').endOf('week').unix()) {
            return `${moment().format('YYYY')}${moment().subtract(1, 'weeks').isoWeek()}`;

          } else {
            return `${moment().format('YYYY')}${moment.unix(R.head(timeRange)).isoWeek()}`
          }
        case 'MONTHLY':
          if (parseInt(R.head(timeRange)) > moment().subtract(1, 'months').endOf('month').unix()) {
            return moment().subtract(1, 'months').format('YYYYMM');
          } else {
            return moment.unix(R.head(timeRange)).format('YYYYMM');
          }
        case 'DAILY':
          if (parseInt(R.head(timeRange)) > moment().subtract(1, 'days').endOf('day').unix()) {
            return moment().subtract(1, 'days').format('YYYYMMDD');
          } else {
            return moment.unix(R.head(timeRange)).format('YYYYMMDD');
          }
        default:
          return false;
      }
    } else {
      switch (mode) {
        case 'WEEKLY':
          return `${moment().format('YYYY')}${moment().subtract(1, 'weeks').isoWeek()}`;
        case 'MONTHLY':
          return moment().subtract(1, 'months').format('YYYYMM');
        case 'DAILY':
          return moment().subtract(1, 'days').format('YYYYMMDD');
        default:
          return false;
      }
    }
  }
}