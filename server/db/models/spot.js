const Sequelize = require('sequelize')
const db = require('../db')

const Spot = db.define('spots', {
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT,
    },
    notes: {
        type: Sequelize.TEXT,
    },
  })
  
  module.exports = Spot