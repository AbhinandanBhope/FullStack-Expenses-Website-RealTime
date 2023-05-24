const User = require('../User');
const bcrypt = require('bcrypt');

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
const LoginUser = async function (req, res, next) {
  try {
    const id = 2;
    const Name1= req.params.Name;
  
    const gmail1 = req.params.gmail;
    const password1 = req.params.password ;
    console.log(gmail1);
    
   const user = await User.findAll({
      where: {
        Gmail: gmail1,
        Name:Name1
      }
    }); 
    console.log(user);
    if(user.length != 0){
    
      bcrypt.compare(password1,user[0].password, async (err,result) =>{
        if(err){
          return  res.status(404).json({ Name1});

        }
        if(result === true){
        return  res.status(201).json({ Name1});

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




module.exports = {
  postUser, LoginUser
  
};
