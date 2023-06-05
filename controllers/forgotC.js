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
const sib = require('sib-api-v3-sdk');
 require('dotenv').config();


 

const ForgotPass = async function (req, res, next) {

    try { 
        const Gmail = req.params.Gmail;
        const client = sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey =process.env.API_KEY
        console.log(process.env.API_KEY)
        const tranEmailApi =new sib.TransactionalEmailsApi();
      const   sender ={
            email:'abhinandanbhope@gmail.com'
        }
      
        const receivers = [ {
            email: Gmail
        },
    ]
    tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:"Otp",
        textContent:"Hi"
    })
    

        console.log(req.params.Gmail);
        
        res.status(201).json({});
        
    
        
        
      }
    catch(err){
        console.log(err)
        return res.status(404).json({})
        
    }
}
module.exports ={
ForgotPass
}
