const User = require('../User');
const bcrypt = require('bcrypt');
const Expense = require('../expense');
const jwt = require('jsonwebtoken');
const { where, Error } = require('sequelize');
const  Razorpay =require('razorpay');
const Orders = require('../orders');
const Order = require('../orders');
const usersController = require('../controllers/productC');
const sequelize = require('../database');
require('dotenv').config();
const AWS = require('aws-sdk');



const GetProducts = async function(req, res, next) {
  try {
    const page = +req.query.page || 1;
  
    const itemsPerPage =2;

    let totalItems = await Expense.count({ where: { userId } });

    const EXPense = await Expense.findAll({
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      where: { userId },
    });
    
    const response = {
      data: {
        Expenses: EXPense,
      },
      currentPage: page,
      hasNextPage: page + 1,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(totalItems / itemsPerPage),
    };


    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while retrieving expenses' });
  }
};


  module.exports ={GetProducts};
