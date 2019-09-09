const date = require('date-and-time');

const now  = new Date();

const currentDate = date.format(now, 'YYYY-MM-DD HH:mm:ss')

module.exports = currentDate;