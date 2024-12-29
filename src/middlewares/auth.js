const config = require('../config/config');
const {BizError} = require("../common/errors");
const {ResultCode} = require("../common/constants");

const auth = () => (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== config.security.apiKey) {
    return next(new BizError(ResultCode.UNAUTHORIZED));
  }

  next();
};

module.exports = auth;
