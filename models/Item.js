const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Item extends Model { }

Item.init({
  description: DataTypes.STRING,
  link: DataTypes.STRING,
  isDone: DataTypes.BOOLEAN
}, { sequelize, modelName: 'item' })

module.exports = Item