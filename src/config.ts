import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: { 
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    mysql: {
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      dbName: process.env.MYSQL_DATABASE,
    },
    mongo: {
      dbName:process.env.MONGODB,
      user: process.env.MONGO_ROOT_USER,
      password: process.env.MONGO_ROOT_PASS,
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10),
      connection: process.env.MONGO_CONNECTION,
      message: 'Connection established to mongo Docker through mongoose'
    },
    atlas: {
      atlas: process.env.MOGO_ATLAS_URI,
      user: process.env.ATLAS_ROOT_USER,
      password: process.env.ATLAS_ROOT_PASS,
      dbName: process.env.ATLAS_MONGODB,
      message: 'Connection established to mongo Atlas through mongoose'

    },
  
    apiKey: process.env.API_KEY,
  }
})
