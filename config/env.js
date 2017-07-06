const env = {
  PORT: process.env.PORT || 8000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgres:postgresql://localhost:5432/notorious-fans',
  DATABASE_NAME: process.env.DATABASE_NAME || 'notorious-fans',
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'test_user',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'pass123',
  DATABASE_PORT: process.env.DATABASE_PORT || 5432,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'postgres',

  NODE_ENV: process.env.NODE_ENV || 'development',
}

module.exports = env
