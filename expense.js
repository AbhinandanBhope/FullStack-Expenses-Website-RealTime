const  Sequelize  = require('sequelize');
const sequelize = require('./database');
const Expense = sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    Name:Sequelize.STRING,
    
    Descp: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true, // Make Gmail column unique
      },
    amount:{
        type: Sequelize.DOUBLE,
  allowNull: false
    }
    
    

    
    
    
});
module.exports = Expense;