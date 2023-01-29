import dotenv from 'dotenv'
dotenv.config()

const config = {
  USER_MYSQL: process.env.USER_MYSQL,
  PASS_MYSQL: process.env.PASS_MYSQL,
  DB_MYSQL: process.env.DB_MYSQL,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
