// module.exports = {
//   MONGOBD_URL:   "mongodb+srv://aluricharan1922:aluricharan@cluster0.eeclpk7.mongodb.net/project?retryWrites=true&w=majority",
//   JWT_SECRET: "CharanAluri192217296174mru",
// };
const dotenv = require('dotenv');
dotenv.config(); // Load the environment variables from .env file

const config = {
 
  MONGOBD_URL: process.env.MONGOBD_URL,
  JWT_SECRET:process.env.JWT_SECRET
};

module.exports = config;
