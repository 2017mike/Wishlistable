const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class List extends Model { }

List.init({
  title: DataTypes.STRING
}, { sequelize, modelName: 'post' })

module.exports = List