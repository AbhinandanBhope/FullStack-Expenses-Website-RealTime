
const bodyParser = require('body-parser');
const express = require('express');

//const fs = require("fs");
const Sequelize =require('sequelize');
const  sequelize = require('../database');
const User = require('../User');




const router = express.Router();
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 
const usersController = require('../controllers/productC');


router.post('/add', usersController.postUser);
router.get('/login/:Name/:password/:gmail', usersController.LoginUser);




    

/*router.get('/delete/:Id', (req, res) => {
  const id1 = req.params.Id;
  User.destroy({where:{Id:id1}}).then((result) => {
    console.log(result);
    
  }).catch((err) => {
    console.log(err);
    
  });;
}); */





  


    
    
   /* fs.appendFile("./customer.json", JSON.stringify({ Name: Name1,phone:phone1 ,gmail:gmail1}) + "\n", "utf8", (err) => {
        if (err) {
          console.log("File append failed:", err);
          res.status(50t0).send("Error occurred while appending data");
          res.redirect('/list');
          return;
        }
        console.log("Data appended to file successfully");
         */
        

      
      
      
    
    
     
    
  
    
    
      
    
    

  module.exports = router;