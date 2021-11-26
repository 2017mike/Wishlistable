const User = require('./User.js')
const List = require('./List.js')
const Item = require('./Item.js')

User.hasMany(List, {foreignKey: 'uid'})
User.hasMany(Item, {foreignKey: 'uid'})

List.hasMany(Item, { foreignKey: 'lid'})
List.belongsTo(User, {foreignKey: 'uid'})


module.exports = { User, List, Item }
