const User = require('../User');

const postUser = async function (req, res, next) {
  try {
    const id = 2;
    const Name1 = req.body.Name1;
    const gmail1 = req.body.gmail1;
    const password = req.body.password;

    console.log(Name1);
    const data = await User.create({
      Name: Name1,
      Gmail: gmail1,
      password:password
    });

   res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};
const getProduct= async  function (req, res ,next)  {
  try{
    const rows = await  User.findAll(); 
    res.json(rows);
    
  }
 catch(err) {
    console.log(err)
    
  };

  
};
const deleteProduct =  async function (req, res, next)  {
  try{
  const id1 = req.params.Id.replace(':', ''); // Remove the colon from the ID
 const data2 = await  User.destroy({ where: { id: id1 } })
 console.log(data2);
 res.status(201).json({data2});
  }
    
    catch(err)  {
      console.log(err)
    };
};

module.exports = {
  postUser,
  getProduct,
  deleteProduct
};
