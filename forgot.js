document.getElementById('forgotGmail').onclick = ForgotPassword;
 async function ForgotPassword(){
  const  token =localStorage.getItem('token')
  const Gmail = document.getElementById('Gmail').value;
  
  axios.get(`http://localhost:3000/password/forgotpassword/${Gmail} ` ,{headers:{"Authorization":token}})
  .then(response => {
  
  console.log(response);

    
        
          

        
            

  

  
  
  
  
  
  
  // Handle successful response
  })
  .catch(error => {
  // Handle error
  console.log(error);
  });
  

}