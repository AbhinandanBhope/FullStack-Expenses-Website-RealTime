const User = require('../User');
const bcrypt = require('bcrypt');
const Expense = require('../expense');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');


const postUser = async function (req, res, next) {
  try {
    const id = 2;
    const Name1 = req.body.Name1;
    const gmail1 = req.body.gmail1;
    const password = req.body.password;
    if(Name1.length ==0 || gmail1.length==0 || password.length==0){
      res.status(404).json({ error: 'An error occurred while creating a user' });
    }

    console.log(Name1);
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await User.create({
      Name: Name1,
      Gmail: gmail1,
      password:hashedPassword
    });

   res.status(201).json({ data });
  } catch (err) {
    console.log(err);
  

    res.status(500).json({ error: 'An error occurred while creating a user' });
    
  }
};
function generateToken(id) {
  return jwt.sign({userId:id} ,'key')
}
var userId =0;
  


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
          const token = generateToken(user[0].id);
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
  try {
    const id = 2;
    const Name1 = req.body.Name1;
    const amount1 = req.body.amount;
    const Descp1= req.body.Descp;
   // if(Name1.length == 0 || amount1.length==0 || Descp1.length==0){                                                                     
    //  res.status(404).json({ error: 'An error occurred while creating a user' });
   // }

    console.log(Name1);
                    
    const data = await Expense.create({
      Name: Name1,                   
      amount: amount1,
      Descp: Descp1,
      userId:userId
    });

   res.status(201).json({ data });
  } catch (err) {
    console.log(err);
  

    res.status(500).json({ error: 'An error occurred while creating a user' });
    
  }
};
const Getexp = async function(req, res) {
  try {
    console.log(req.user);
     userId = req.user.id;
  
    await Expense.findAll({ where: { userId } }).then((result) => {
      const rows = result; 
      res.json(rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while retrieving expenses' });
  }
};


  const deleteExp = async function (req, res) {
    
    try {
      const id1 = req.params.Id.replace(':', ''); 
      if(id1==undefined || id1.length==0){
        res.send(404);
      }
      await Expense.destroy({ where: { id: id1 } });
      res.send(`User with ID ${id1} has been deleted.`);
    } catch (err) {
      console.log(err);
      res.status(500).send('An error occurred while deleting the user.');
    }
  };
  




module.exports = {
  postUser, LoginUser ,postExp ,Getexp ,deleteExp
  
};
