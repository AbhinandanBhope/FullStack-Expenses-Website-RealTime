

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//const Sequelize = require('./database');
const app = express();
//app.use(cors())
app.set('view engine', 'ejs');
const adminRoutes = require('./routes/admin');
var cors = require('cors');
const sequelize = require('./database');
app.use(cors());
const User = require('./User');
const Expense = require('./expense');
const Order = require('./orders');


 


/*db.execute('SELECT * FROM users').
then(result => {
  console.log(result);
  
}).catch(err => {
  console.log(err);
  
}); */




app.use(adminRoutes);
app.use(express.json()); // for parsing application/

  


  /*app.delete('/delete/:Id',  async (req, res) => {
    try{
    const id1 = req.params.Id.replace(':', ''); // Remove the colon from the ID
   const data2 = await  User.destroy({ where: { id: id1 } })
   console.log(data2);
   res.status(201).json({data2});
    }
      
      catch(err)  {
        console.log(err);
      };
  }); */
  
  
  
  
  User.hasMany(Expense);
  Expense.belongsTo(User);
  User.hasMany(Order);
  Order.belongsTo(User);








app.use(bodyParser.urlencoded({ extended: false}));
sequelize.sync().then((result) => {

  console.log(result)
   app.listen(3000);
}).catch((err) => {
  console.log(err)
  
});





    
   
    



