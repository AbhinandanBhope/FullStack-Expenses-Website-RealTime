

async function login(event) {
  event.preventDefault();

  const Name1 = document.getElementById('Name').value;
          const gmail1 = document.getElementById('Gmail').value;
          const password = document.getElementById('PassWord').value;
          if( gmail1 == '' || Name1 =='' || password =='') {
            document.getElementById('Gmail').placeholder =  'Cannot be empty';
            document.getElementById('PassWord').placeholder =  'Cannot be empty';
            document.getElementById('Name').placeholder =  'Cannot be empty';

          }
          console.log(gmail1);
          
   const obj2 ={
    Name1,
    password,
    gmail1
   };

  

    
   axios.get(`http://localhost:3000/login/${Name1}/${password}/${gmail1}`)
.then(response => {

const obj = response.data;
if(response.status ===201){
  alert(`Hi ${ Name1} ur login success`)
  localStorage.setItem('token',response.data.token);
 // window.location.href="file:///C:/Bokkingapp/BookingApp/forntend.html";
 window.location.href="file:///C:/Bokkingapp/BookingApp/loginsuccess.html";
}


//showOutput(obj) ;
console.log(response.status);




// Handle successful response
})
.catch(error => {

if (error.response && error.response.status === 404) {
  alert(`one or more fields error please try again`);
  // Perform any necessary actions for a failed login
} 
else if (error.response && error.response.status === 400) {
  alert(` Incorrect password`);
  // Perform any necessary actions for a failed login
} 
else {
  alert('An error occurred while logging in');
  console.log(error);
}



// Handle error
console.log(error);
console.log("hellow");
});
}
 function Signup() {
  window.location.href="file:///C:/Bokkingapp/BookingApp/forntend.html";

  
 }


  
  


