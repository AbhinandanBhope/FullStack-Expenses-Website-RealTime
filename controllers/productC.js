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


 
const postUser = async function (req, res, next) {
  const transaction = await sequelize.transaction();
  
  try {
    const id = 2;
    const Name1 = req.body.Name1;
    const gmail1 = req.body.gmail1;
    const password = req.body.password;

    if (Name1.length === 0 || gmail1.length === 0 || password.length === 0) {
      res.status(404).json({ error: 'An error occurred while creating a user' });
    }

    console.log(Name1);
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const data = await User.create({
      Name: Name1,
      Gmail: gmail1,
      password: hashedPassword
    }, { transaction });

    await transaction.commit();

    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};

function generateToken(id , isPremumUser) {
  return jwt.sign({userId:id , isPremumUser} ,'key')
}
var userId =0;
var TotalExpense = 0;

  
const purchasepremium = async (req , res) =>{
  
  try{
    console.log("SS ="+ req.user);
    var rzp = new Razorpay({
      key_id: process.env.KEY_ID ,
      key_secret: process.env.KEY_SECRET 
    });
    
    const amount =2500;
    rzp.orders.create({amount,currency:"INR"} , (err,order)=>{
      if(err){
        console.log(err);
        throw new Error(JSON.stringify(err));
      }
     req.user.createOrder({orderid:order.id, status:"PENDING"}).then(()=>{
      
        return res.status(201).json({order,key_id:rzp.key_id});
      }
      ).catch(err =>{
        throw new Error(err);
      })

      
    })
  } catch (err){
    console.log(err);
    res.send(403).json({message:"spmmmmm" ,error:err})
  }
}


const updatetransactionstatus = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });

    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const updateOrderPromise = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' }, { transaction });
    const updateUserPromise = req.user.update({ isPremumUser: true }, { transaction });

    await Promise.all([updateOrderPromise, updateUserPromise]);

    await transaction.commit();

    return res.status(202).json({ success: true, message: 'Transaction successful', token: generateToken(userId, true) });
  } catch (err) {
    console.error('Error updating transaction status:', err);
    await transaction.rollback();
    return res.status(500).json({ success: false, message: 'An error occurred' });
  }
};

 

const LoginUser = async function (req, res, next) {
  try {
    
    const Name1= req.params.Name;
  
    const gmail1 = req.params.gmail;
    const password1 = req.params.password ;
    console.log(gmail1);
    
   const user = await User.findAll({
      where: {
        Gmail: gmail1,
        Name:Name1,
        
      }
    }); 
    console.log(user);
    if(user.length != 0){
    
      bcrypt.compare(password1,user[0].password, async (err,result) =>{
        if(err){
          return  res.status(404);

        }
        if(result === true){
          const token = generateToken(user[0].id,user[0].isPremumUser);
           TotalExpense = user[0].TotalExpense;
            return res.status(201).json({ Name1, token });

        }
        else{
          console.log(err);
          return res.status(400).json({})
        }

      }) 
      
      
    }
    else if(user){

      res.status(404).json({ Name1});
    }

    console.log(Name1);
    
    
  } catch (err) {
    console.log(err);
  


    res.status(500).json({ error: 'An error occurred while creating a user' });
    
  }
};
const postExp = async function (req, res, next) {
  const t = await sequelize.transaction();
  try {
    const id = 2;
    const Name1 = req.body.Name1;
    const amount1 = req.body.amount;
    const Descp1 = req.body.Descp;

    console.log(Name1);

    const data = await Expense.create({
      Name: Name1,
      amount: amount1,
      Descp: Descp1,
      userId: userId
    }, { transaction: t });

    const user = await User.findOne({ where: { id: userId } });
    const TotalExpense = Number(user.TotalExpense) + Number(amount1);
    
    await user.update({ TotalExpense }, { transaction: t });

    await t.commit();

    res.status(201).json({ data });
  } catch (err) {
    console.log(err);

    await t.rollback();

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};

const Getexp = async function(req, res) {
  try {
    console.log(req.user +"a");
     userId = req.user.id;
  
    await Expense.findAll({ where: { userId } }).then((result) => {
      const rows = result; 
      
      res.status(200).json({rows});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while retrieving expenses' });
  }
};

const donloadExp = async function(req, res) {
  try {
    console.log(req.user +"a");
     userId = req.user.id;
  
    await Expense.findAll({ where: { userId } }).then((result) => {
      const rows = result; 
      
      
    const fileUrl = 'http://example.com/downloads/myexpense.csv';

    
    res.status(200).json({ fileUrl, rows });

    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while retrieving expenses' });
  }
};
const deleteExp = async function (req, res) {
  let t;
  try {
    const id1 = req.params.Id.replace(':', '');
    if (id1 == undefined || id1.length == 0) {
      res.send(404);
    }

    t = await sequelize.transaction();

    const expense = await Expense.findOne({ where: { id: id1, userId: userId } });

    if (!expense) {
      return res.status(404).send(`Expense with ID ${id1} not found.`);
    }

    await expense.destroy({ transaction: t });

    const user = await User.findOne({ where: { id: userId } });
    const TotalExpense = Number(user.TotalExpense) - Number(expense.amount);

    await user.update({ TotalExpense }, { transaction: t });

    await t.commit();

    res.send(`Expense with ID ${id1} has been deleted.`);
  } catch (err) {
    console.log(err);

    if (t) {
      await t.rollback();
    }

    res.status(500).send('An error occurred while deleting the user.');
  }
};







module.exports = {
  postUser, LoginUser ,postExp ,Getexp ,deleteExp , purchasepremium ,updatetransactionstatus ,donloadExp
  
};
