
window.addEventListener('DOMContentLoaded', () => {
  const objUrlParams = new URLSearchParams(window.location.search);
  const page = objUrlParams.get("page") || 1;
  
  const token = localStorage.getItem('token');

  axios.get(`http://localhost:3000/Pagination/products?page=${page} `,{Headers:{'Authorization':token}})
    .then(( response) => {
          
    
      const { Expenses, currentPage, hasNextPage, hasPreviousPage, lastPage } = response.data;
      console.log(JSON.stringify(Expenses, null, 2)); 
    
      
     console.log(response.data.data);
    })
    
    .catch((error) => {
      console.log("404"+error);
    })
});

function showPagination({
  currentPage,
  hasNextPage,
  nextPage,
  hasPreviousPage,
  lastPage,
}) {
 //pagination.innerHTML = '';
  if (hasPreviousPage) {
    // Add logic for handling previous page
  }
}

function listProducts(products) {
} 



showAllProducts();

async function UserExpense(event) {
  event.preventDefault();

  const Name1 = document.getElementById('NameE').value;
          const amount = document.getElementById('amount').value;
          
          const catSelect = document.getElementById('Cat');
          
        
        
            const Descp= catSelect.options[catSelect.selectedIndex].text;
          
          
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
Pro2.style.display = Pro2.style.display === 'none' ? 'block' : 'none';




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
 document.getElementById('buyprim').onclick = async function (e){
  
  const  token =localStorage.getItem('token')
  console.log(token);
  
  const response = await axios.get('http://localhost:3000/premiummembership', { headers: { "Authorization": token } });

  console.log(response);
  var options ={
    "key":response.data.key_id,
    "order_id":response.data.order.id,
    "handler" : async function(response){
      await axios.post('http://localhost:3000/purchase/updatetransactionstatus' ,{
      order_id: options.order_id ,
      payment_id: response.razorpay_payment_id, },
      {headers:{"Authorization": token}

      })
      alert('You are premium user now')
      document.getElementById('buyprim').style.visibility = "hidden";

    
      

    }
  }
  
 
 var rzp1 = new Razorpay(options);

    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed',function (response) {
      console.log(response);
      alert("something went worng")
      
    })
}
;
document.getElementById('Show').onclick = showLeaderBoard;
 async function showLeaderBoard(){
  const  token =localStorage.getItem('token')
  
  axios.get('http://localhost:3000/getLeaderboard' ,{headers:{"Authorization":token}})
  .then(response => {
  
  const obj3 = response.data;
  console.log(response.data)
  console.log(obj3);
  const Pro2 = document.getElementById('Pro2');
       Pro2.innerHTML = '';
       if (Pro2.style.display === 'none') {
        Pro2.style.display = 'block';
      } 
        let i =1;
        obj3.forEach(item => {
         
        
          

            const li = document.createElement('h4');
            const iTEMMS = document.createTextNode( i+" "+item.Name +" "+"Amount = "+item.TotalExpense+"  ");

            i++;


            
            
            
            
            
            const Space = document.createElement('div');
            Space.classList.add =("distance")
            li.appendChild(iTEMMS);
            
            
            
            
           
            li.appendChild(Space);
            Pro2.appendChild(li);
            
        }); 
        const Hide = document.createElement('button')
        Hide.classList.add('button');
      Hide.textContent = 'Hide';
          Pro2.appendChild(Hide);
          Hide.onclick =remove;

        
            
  

  
  
  
  
  
  
  // Handle successful response
  })
  .catch(error => {
  // Handle error
  console.log(error);
  });
  

}
function remove() {
  const Pro2 = document.getElementById('Pro2');
       Pro2.innerHTML = '';
       Pro2.style.display = Pro2.style.display === 'none' ? 'block' : 'none';
  
  
}
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}



async function showAllProducts() {
  const Pro2 = document.getElementById('Pro2');
  Pro2.style.display = Pro2.style.display === 'none' ? 'block' : 'none';
  const token = localStorage.getItem('token')
  const decode = parseJwt(token);
  console.log(decode);
    if(decode.isPremumUser == true){
        document.getElementById('buyprim').style.visibility = "hidden";
      
      // Handle successful response
  

    }
  
   




    else{
      document.getElementById('Show').style.visibility = "hidden";
      
      document.getElementById('downloadexpense').style.visibility = "hidden";
        
      
    }
    const objUrlParams = new URLSearchParams(window.location.search);
    const page = objUrlParams.get("page") || 1;
    getProducts(page);
  }
    
    function getProducts(page){
      const token = localStorage.getItem('token')
    
  
    axios.get(`http://localhost:3000/Pagination/products?page=${page} `,{Headers:{'Authorization':token}})
      .then(( response) => {
            
      
        const { Expenses, currentPage, hasNextPage, hasPreviousPage, lastPage } = response.data;
        console.log(JSON.stringify(Expenses, null, 2)); 
        alert("HI")
      
        
       console.log(response.data);
       showOutput(response.data.data.Expenses) 
       showPagination(response.data);

      })
      .catch(error => {
      // Handle error
      console.log(error);
      });

    }
  

   function showPagination({
    currentPage ,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage

   }){
    
  if(hasNextPage){
    
    const Pro3 = document.getElementById('pro3');
    Pro3.innerHTML='';
    const NextBtn = document.createElement('button')
    NextBtn.classList.add('button');
    NextBtn.textContent = 'Next';
    NextBtn.addEventListener('click',()=> getProducts(currentPage+1));
    Pro3.appendChild(NextBtn);

  }
  
  if(hasPreviousPage){
    const Pro3 = document.getElementById('pro3');
    Pro3.innerHTML='';
    const PreBut = document.createElement('button')
    PreBut.classList.add('button');
    PreBut.textContent = 'Previous';
   PreBut.addEventListener('click',() => getProducts(previousPage));
    Pro3.appendChild(PreBut);

  }
   }

function showOutput(obj2) {
console.log(obj2);
  // Assuming you have an array of expense objects called 'expenses'
  

  

  const tableBody = document.getElementById('expenseTableBody');
  
   
  
  

  // Clear existing table rows
  tableBody.innerHTML = '';

  // Iterate over the expenses array and create table rows dynamically
  obj2.forEach((item) => {
    const row = document.createElement('tr');

    // Create table cells for each column
    const idCell = document.createElement('td');
  

    const textCell = document.createElement('td');
    const textName = document.createTextNode(item.Name)
    console.log(textCell);
    textCell.appendChild(textName);

    const amountCell = document.createElement('td');
    
    const amount = document.createTextNode(item.amount)
    amountCell.appendChild(amount);

    const categoryCell = document.createElement('td');
    
    const category = document.createTextNode(item.Descp)
    
    categoryCell.appendChild(category);

    const actionsCell = document.createElement('td');
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('button');
    deleteBtn.textContent = 'Delete';
    actionsCell.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
      deleteItem(item);
      console.log(item);

  });
    

    // Append cells to the row
    row.appendChild(idCell);
    row.appendChild(textCell);
    row.appendChild(amountCell);
    row.appendChild(categoryCell);
    row.appendChild(actionsCell);

    // Append the row to the table body
    tableBody.appendChild(row);

  })
}

// Call the populateTable function to initially populate the table




      async  function  deleteItem(item) {
        try{
       const response = await axios.delete(`http://localhost:3000/delete/${item.id}`)
            
                console.log('Successfully deleted item:', item);
                console.log(response);
                showAllProducts();
                
  const Pro2 = document.getElementById('Pro2');
  Pro2.style.display = Pro2.style.display === 'none' ? 'block' : 'none';

    
    
    // Call showLeaderBoard function
    

                // Refresh the list after deletion
              
                
        }
        
            
            catch (error)  {
                console.log('Error deleting item:', item);
                console.log(error);
            };
            
    } 
    
  
 
  
function download(){
  
  const token = localStorage.getItem('token')
  
  axios.get('http://localhost:3000/user/download', { headers: {"Authorization" : token} })
  .then((response) => {
    console.log(response);
      if(response.status === 200){
          //the bcakend is essentially sending a download link
          //  which if we open in browser, the file would download
         var a = document.createElement("a");
          a.href = response.data.fileUrl;
          a.download = 'myexpense.csv';
          a.click();
      } else {
        alert("somthing went worng")
          console.log("err");
      }

  })
  .catch((err) => {
      console.log(err)
  });
}
function Showdownload(){
  
  const token = localStorage.getItem('token')
  if (Pro2.style.display === 'none') {
    Pro2.style.display = 'block';
  } 
  
  axios.get('http://localhost:3000/Olddownload', { headers: {"Authorization" : token} })
  .then((response) => {
    console.log(response);
      if(response.status === 200){
        const Data9 = response.data.data8;
        console.log(Data9);
          //the bcakend is essentially sending a download link
          //  which if we open in browser, the file would download
          
  const Pro2 = document.getElementById('Pro2');
  Pro2.innerHTML = '';

   let i =1;

   Data9.forEach(item => {
    console.log(item);
    
   
     

       const li = document.createElement('h4');
       const iTEMMS = document.createTextNode( i+" "+item.downloadedfiles +" "+"Downloaded At = "+item.updatedAt+"  ");
       i++;
       
       
       
    
       
       
       const Space = document.createElement('div');
              Space.classList.add =("distance")
       li.appendChild(iTEMMS);
       
       
       
       
      
       li.appendChild(Space);
       Pro2.appendChild(li);
       
        
      })
      
      const Hide = document.createElement('button')
      Hide.classList.add('button');
    Hide.textContent = 'Hide';
        Pro2.appendChild(Hide);
        Hide.onclick =remove;

      
          


     } else {
        alert("somthing went worng")
          console.log("err");
      }

  })
  .catch((err) => {
      console.log(err)
  });
}






