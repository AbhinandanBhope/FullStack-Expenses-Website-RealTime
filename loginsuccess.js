
showAllProducts();
 
async function UserExpense(event) {
  event.preventDefault();

  const Name1 = document.getElementById('NameE').value;
          const amount = document.getElementById('amount').value;
          const Descp= document.getElementById('Descp').value;
          if( Name1 == '' || amount=='' || Descp =='') {
            document.getElementById('NameE').placeholder =  'Cannot be empty';
            document.getElementById('amount').placeholder =  'Cannot be empty';
            document.getElementById('Descp').placeholder =  'Cannot be empty';

          } 
          
   const obj ={
    Name1,
    amount,
    Descp
   };

  
   const token = localStorage.getItem('token');
    
   axios.post('http://localhost:3000/addExp',obj,{Headers:{'Authorization':token}})
.then(response => {

const obj2 = response.data;
if(response.status ===201){
  //window.location.href="file:///C:/Bokkingapp/BookingApp/forntend.html";
}

showAllProducts();
console.log(response.status);




// Handle successful response
})
.catch(error => {

if (error.response && error.response.status === 500) {
  alert(`one or more fields error please try again`);
  // Perform any necessary actions for a failed login
} else {
  alert('An error occurred while logging in');
  console.log(error);
}





// Handle error
console.log(error);
console.log("hellow");
});
}
   

async function showAllProducts() {
  const token = localStorage.getItem('token')
    
    axios.get('http://localhost:3000/getExp' ,{headers:{"Authorization":token}})
.then(response => {

const obj2 = response.data;
showOutput(obj2) ;





// Handle successful response
})
.catch(error => {
// Handle error
console.log(error);
});

function showOutput(obj2) {
console.log(obj2);



const Pro = document.getElementById('Pro');
       Pro.innerHTML = '';

        obj2.forEach(item => {
            const li = document.createElement('h4');
            const iTEMMS = document.createTextNode("Name= "+item.Name +" Quantity= "+item.Descp +" Price= "+item.amount+"  ");
            const deleteBtn = document.createElement('button')
            deleteBtn.classList.add('button');
            
            
            
            
            const Space = document.createElement('div');
            Space.classList.add =("distance")
            deleteBtn.appendChild(document.createTextNode('Delete'));

            deleteBtn.addEventListener('click', () => {
                deleteItem(item);
                console.log(item);

            });
            
  
            
            
            
            

            li.appendChild(iTEMMS);
            li.appendChild(deleteBtn);
            
            
            
           
            li.appendChild(Space);
            Pro.appendChild(li);
        });

      async  function  deleteItem(item) {
        try{
       const response = await axios.delete(`http://localhost:3000/delete/${item.id}`)
            
                console.log('Successfully deleted item:', item);
                console.log(response);
                showAllProducts();
                // Refresh the list after deletion
              
                
        }
            
            catch (error)  {
                console.log('Error deleting item:', item);
                console.log(error);
            };
    } 
    
  }
}





