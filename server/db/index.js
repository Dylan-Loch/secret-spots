//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Spot = require('./models/spot');

//associations could go here!
User.hasMany(Spot);
Spot.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Spot,
  },
}
