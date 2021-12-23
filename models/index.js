const User = require('./User.js')
const List = require('./List.js')
const Item = require('./Item.js')
const SavedList = require('./SavedList.js')

User.hasMany(List, {foreignKey: 'uid'})
User.hasMany(Item, {foreignKey: 'uid'})

User.hasMany(SavedList, {foreignKey: 'uid'})
SavedList.belongsTo(User, {foreignKey: 'uid'})

List.hasMany(Item, { foreignKey: 'lid'})
List.belongsTo(User, {foreignKey: 'uid'})



// Item.belongsTo(List, { foreignKey: 'lid'})


module.exports = { User, List, Item, SavedList }
