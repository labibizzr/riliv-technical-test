const Sequelize = require('sequelize');

module.exports = new Sequelize('riliv-test', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres'
})


 