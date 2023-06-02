const Sequlize= require('sequelize');
const sequelize = require('./database');

 const Order = sequelize.define('order', {id: {
    type:Sequlize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey:true
 },
 paymentid:Sequlize.STRING,
 orderid:Sequlize.STRING,
 status:Sequlize.STRING

 })
 
 module.exports = Order;