const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class SavedList extends Model { }

SavedList.init({
  listId: {
    type: DataTypes.INTEGER,
    references: {
    model: 'lists', 
    key: 'id' 
  }
  }
}, { sequelize, modelName: 'savedList' })

module.exports = SavedList