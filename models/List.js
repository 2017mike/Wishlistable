const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class List extends Model { }

List.init({
  title: DataTypes.STRING,
  randomURL: DataTypes.STRING
}, { sequelize, modelName: 'list' })

module.exports = List