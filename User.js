const  Sequelize  = require('sequelize');
const sequelize = require('./database');
const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    Name:Sequelize.STRING,
    Gmail:Sequelize.STRING,
    password:{
        type: Sequelize.STRING,
  allowNull: false
    }
    
    

    
    
    
});
module.exports = User;