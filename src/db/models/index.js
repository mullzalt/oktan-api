require('dotenv').config()
const { Sequelize, Op, DataTypes } = require('sequelize')
const fs = require('fs')

const env = process.env.NODE_ENV || 'development'

const database = require('../../configs/database')[env]

const db = {}

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)


db.Sequelize = Sequelize
db.sequelize = sequelize
db.Op = Op
db.DataTypes = DataTypes

module.exports = db
