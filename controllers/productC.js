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


module.exports = {
  postUser,
  
};
