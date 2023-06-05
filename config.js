export default {
  DB_NAME: process.env.DB_NAME,
  DB_URI: process.env.DB_URI,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  PORT: process.env.PORT || 3000,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
}
