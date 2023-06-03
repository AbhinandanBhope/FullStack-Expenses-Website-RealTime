const User = require('../User');
const bcrypt = require('bcrypt');
const Expense = require('../expense');
const jwt = require('jsonwebtoken');
const { where, Error } = require('sequelize');
const  Razorpay =require('razorpay');
const Orders = require('../orders');
const Order = require('../orders');
const usersController = require('../controllers/productC');
 


const getLeaderboard = async function (req, res, next) {
    try {

        const users = await User.findAll();
        const expenses = await Expense.findAll();
        const userAgreegate ={};
        expenses.forEach((expense) => {
            if(userAgreegate[expense.userId] ){
            userAgreegate[expense.userId] =userAgreegate[expense.userId] +expense.amount;
            }
            else{
                userAgreegate[expense.userId] =expense.amount
            }
            
        });
        var usserLeaderBoardDetails =[];
        users.forEach((user) => {
            usserLeaderBoardDetails.push({name:user.Name,totalcost:userAgreegate[user.id] || 0})

            
        });
        console.log(usserLeaderBoardDetails);
        usserLeaderBoardDetails.sort((a,b)=>b.totalcost-a.totalcost)
        res.status(200).json(usserLeaderBoardDetails);
    } catch (err) {
      console.log(err);
    
  
      res.status(500).json({ error: 'An error occurred while creating a user' });
      
    }
  };
  
module.exports = {
getLeaderboard
    
  };