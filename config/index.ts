import dotenv from 'dotenv'
dotenv.config()

const config = {
  USER_MYSQL: process.env.USER_MYSQL || "tailieut_datisekai",
  PASS_MYSQL: process.env.PASS_MYSQL,
  DB_MYSQL: process.env.DB_MYSQL || "tailieut_social",
  JWT_SECRET: process.env.JWT_SECRET || "datisekai",
};

export default config;
