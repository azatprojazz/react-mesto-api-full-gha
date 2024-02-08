const { PORT = 3005, BD_URL = 'mongodb://127.0.0.1:27017/mestodb', JWT_SECRET = 'DEV_JWT' } = process.env;

module.exports = {
  PORT,
  BD_URL,
  JWT_SECRET,
};
