
// ===============================
// DEMO CAFE PREMIUM APP JS
// PART 3 - MENU + CART SYSTEM
// ===============================



// MENU DATA

const menuItems = [

{
id:1,
name:"Cappuccino",
category:"Coffee",
price:180,
image:"https://images.unsplash.com/photo-1572442388796-11668a67e4d8",
desc:"Rich espresso with creamy milk foam"
},


{
id:2,
name:"Classic Pizza",
category:"Food",
price:399,
image:"https://images.unsplash.com/photo-1513104890138-7c749659a591",
desc:"Fresh baked pizza with cheese"
},


{
id:3,
name:"Chocolate Cake",
category:"Dessert",
price:220,
image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587",
desc:"Soft chocolate delight"
},


{
id:4,
name:"Cold Coffee",
category:"Drinks",
price:150,
image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
desc:"Refreshing chilled coffee"
}

];





let cart=[];





// LOAD MENU


function loadMenu(){


const menu=document.getElementById("menuList");


if(!menu) return;



menu.innerHTML="";



menuItems.forEach(item=>{


menu.innerHTML += `


<div class="menu-card">


<img src="${item.image}">


<h3>
${item.name}
</h3>


<p>
${item.desc}
</p>


<div class="price">
₹${item.price}
</div>


<button 
class="primary-btn"
onclick="addCart(${item.id})">

Add +

</button>


</div>


`;



});



}





// ADD TO CART


function addCart(id){


let item =
menuItems.find(x=>x.id===id);



cart.push(item);



updateCart();



showToast(
item.name+" added to cart"
);



}





// UPDATE CART


function updateCart(){



let count =
document.getElementById("cartCount");

let items =
document.getElementById("cartItems");

let total =
document.getElementById("cartTotal");



if(count)
count.innerHTML=cart.length;



let sum=0;



if(items){


items.innerHTML="";



cart.forEach((item,index)=>{


sum += item.price;



items.innerHTML += `


<div style="
padding:15px;
border-bottom:1px solid #333;
">


<h3>
${item.name}
</h3>


<p>
₹${item.price}
</p>


<button onclick="removeCart(${index})">
Remove
</button>


</div>


`;



});



}



if(total)
total.innerHTML=sum;



}






// REMOVE CART


function removeCart(index){


cart.splice(index,1);


updateCart();


}





// OPEN CART


function openCart(){


document
.getElementById("cartDrawer")
.classList.add("active");


}





// CLOSE CART


function closeCart(){


document
.getElementById("cartDrawer")
.classList.remove("active");


}







// THEME


function toggleTheme(){


document.body.classList.toggle("light");


}







// SCROLL MENU


function scrollMenu(){


document.querySelector(".menu")
.scrollIntoView({

behavior:"smooth"

});


}







// TOAST


function showToast(message){


let toast =
document.getElementById("toast");


if(!toast) return;


toast.innerHTML=message;


toast.classList.add("show");



setTimeout(()=>{


toast.classList.remove("show");


},2000);



}







// START APP


document.addEventListener(
"DOMContentLoaded",
()=>{


loadMenu();


});

// =================================
// PART 6 - SEND ORDER TO FIREBASE
// =================================


function placeFirebaseOrder(){


    if(cart.length === 0){

        showToast("Cart is empty");

        return;

    }



    let orderData = {


        id: Date.now(),


        customer:
        localStorage.getItem("customerName") || "Guest",


        mobile:
        localStorage.getItem("customerMobile") || "",


        table:
        localStorage.getItem("tableNumber") || "1",


        items:
        cart.map(item => item.name).join(", "),


        total:
        cart.reduce(
            (sum,item)=>sum + item.price,
            0
        ),


        status:
        "Pending",


        time:
        new Date().toLocaleString()


    };





    if(!window.cafeDB){


        showToast("Firebase not connected");

        return;

    }





    cafeDB
    .ref("orders/" + orderData.id)
    .set(orderData)

    .then(()=>{


        showToast(
        "Order Sent Successfully"
        );


        cart=[];


        updateCart();


    })


    .catch(error=>{


        console.log(error);


        showToast(
        "Order Failed"
        );


    });



}
// =================================
// PART 6C - SEND ORDER TO FIREBASE
// =================================

function sendOrderToFirebase(){

    if(!cart || cart.length === 0){
        alert("Cart empty");
        return;
    }


    const order = {

        customer:
        localStorage.getItem("customerName") || "Guest",

        mobile:
        localStorage.getItem("customerMobile") || "",

        table:
        localStorage.getItem("tableNumber") || "1",


        items:
        cart.map(item => ({
            name: item.name,
            price: item.price,
            qty: item.qty || 1
        })),


        total:
        cart.reduce(
            (sum,item)=>
            sum + (item.price * (item.qty || 1)),
            0
        ),


        status:"Pending",


        time:
        new Date().toISOString()

    };



    cafeDB.ref("orders")
    .push(order)

    .then(()=>{

        alert("Order placed successfully ✅");

        cart=[];

        if(typeof updateCart === "function"){
            updateCart();
        }

    })

    .catch(error=>{

        console.log(error);

        alert("Order failed");

    });


}
