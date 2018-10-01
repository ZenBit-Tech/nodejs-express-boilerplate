const moment = require("moment");

const startMiddleware = (request, response, next) => {
  const time = moment().format("HH:mm:ss");

  var data = `${time} ${request.method} ${request.url}`;

  logger.event(data);
  logger.logStart()

  next();
};

module.exports = startMiddleware;
