const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    PORT: Joi.number().default(3000),
    MONGO_URL: Joi.string().required(),
    RABBITMQ_URL: Joi.string().required(),
    REDIS_URL: Joi.string().required(),
    API_KEY: Joi.string().required(),
    SHOP_SERVICE_URL: Joi.string().required(),
  })
  .unknown();

const { value: env, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: env.NODE_ENV,
  port: env.PORT,
  mongoose: {
    url: env.MONGO_URL,
    options: {},
  },
  rabbitmq: {
    url: env.RABBITMQ_URL,
  },
  redis: {
    url: env.REDIS_URL,
  },
  business: {
  },
  security: {
    apiKey: env.API_KEY,
  },
  shop: {
    url: env.SHOP_SERVICE_URL,
  },
};
