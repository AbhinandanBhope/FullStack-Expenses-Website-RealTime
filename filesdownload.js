const  Sequelize  = require('sequelize');
const sequelize = require('./database');
const Downloads = sequelize.define('downloads',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    
    
    downloadedfiles: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: false, // Make Gmail column unique
      }
    
    
    

    
    
    
});
module.exports = Downloads;