require('dotenv').config() 

module.exports = {

  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "port": process.env.DB_PORT,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "dialect": "mysql",
    "use_env_variable": process.env.JAWSDB_URL
  }
}
