const { Sequelize } = require("sequelize");

  const sequelize = new Sequelize('tomie', 'root', '9612#Rahtes', {
      dialect: 'mariadb',
      dialectOptions: {connectTimeout: 1000} // mariadb connector option
    })

  module.exports = sequelize