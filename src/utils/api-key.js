const crypto = require('crypto');

const generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const apiKey = generateApiKey();
console.log('Generated API Key:', apiKey);