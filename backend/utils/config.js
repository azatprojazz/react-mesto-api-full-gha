const { PORT = 3005, JWT_SECRET = 'DEV_JWT' } = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
};
