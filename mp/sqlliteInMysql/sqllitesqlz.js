/**
 * Created by user1 on 7/24/2016.
 */


var Sequelize = require('sequelize');

var sequelize = new Sequelize("_databaseName_", "_username_", "_password_", {
    dialect: 'sqlite',
    storage: "database.sqlite"
});

var User = sequelize.define('User',
    {
        username: Sequelize.STRING,
        password: Sequelize.STRING
    })

User.sync();

var user = User.create({ username: "admin", password: "bolognese" });