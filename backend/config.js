
const dotenv = require('dotenv');
dotenv.config(); // Load the environment variables from .env file

const config = {
 
  MONGOBD_URL: process.env.MONGOBD_URL,
  JWT_SECRET:process.env.JWT_SECRET
};

module.exports = config;
