const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Appointments = require('../models/Appointments');
const Users = require('../models/User');

const connection = new Sequelize(dbConfig);

Users.init(connection);
Appointments.init(connection);

Users.associate(connection.models);
Appointments.associate(connection.models);

module.exports = connection;
