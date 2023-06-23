const User = require('../User');
const bcrypt = require('bcrypt');
const Expense = require('../expense');

const { where, Error } = require('sequelize');
const  Razorpay =require('razorpay');
const Orders = require('../orders');
const Order = require('../orders');
const usersController = require('../controllers/productC');
const jwt = require('jsonwebtoken');
const sequelize = require('../database');
require('dotenv').config();
const AWS = require('aws-sdk');




const Downloads = require('../filesdownload');

 
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
    console.log("h1");

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};



function generateToken(id , isPremumUser) {
  return jwt.sign({userId:id , isPremumUser} ,'key')}
var userId =0;
var TotalExpense = 0;

 

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
    userId = user[0].id;
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
   function uploadToS3(data, fileName){
  const BUCKET_NAME = process.env.BUCKET_NAME ;
  const IAM_USER_KEY =process.env.IAM_USER_KEY;
  const  IM_USER_SECRET =process.env.IM_USER_SECRET;
  let s3Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY ,
    secretAccessKey : IM_USER_SECRET,
   // Bucket: BUCKET_NAME
  })

  var params ={
    Bucket:BUCKET_NAME,
    Key:fileName,
    Body:data ,
    ACL: 'public-read'
  }
  return new Promise((resolve, reject) => {
  s3Bucket.upload(params,(err , s3response) =>{
    if(err){
      reject(err);
      console.log('something went worng'+err);
      alert(err);

    }
    else{
      console.log('SUCCESS'+ s3response);
      resolve (s3response.Location);
    }
  })
  })
}


const donloadExp = async function(req, res) {
  try {

    console.log(req.user +"a");
     userId = req.user.id;

    await Expense.findAll({ where: { userId } }).then(async (result) => {
      const rows = result; 
      const StrigifyEXp = JSON.stringify(rows);
      //it should depends on the UserId
      const UserID = req.user.id;

    const fileName = `myexpense${UserID}/${new Date()}.txt`;
    const fileUrl =   await uploadToS3( StrigifyEXp ,fileName);

    const data4 = await Downloads.create({
      userId: UserID,
    downloadedfiles: fileUrl




    });
    console.log(data4);

   

    res.status(200).json({ fileUrl, success:true});

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

const GetProducts = async function(req, res, next) {
  try {

    const page = +req.query.page || 1;
    const number = +req.query.numberitem || 2;


    const itemsPerPage =number;

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



    

    


      
      





module.exports = {
  postUser, LoginUser ,postExp ,Getexp ,deleteExp , purchasepremium ,updatetransactionstatus ,donloadExp ,GetProducts
  
};
