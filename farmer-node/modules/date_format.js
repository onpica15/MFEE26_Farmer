const moment = require('moment-timezone');

const dateFormat = "YYYY-MM-DD";

const todateString = (t)=> moment(t).format(dateFormat);

module.exports = todateString;