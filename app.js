
const menuData = {

    chai: [
        {name:"Masala Chai", price:30},
        {name:"Special Tea", price:50},
        {name:"Cappuccino", price:120},
        {name:"Cold Coffee", price:150}
    ],

    patties:[
        {name:"Veg Patties", price:40},
        {name:"Paneer Patties", price:60}
    ],

    burger:[
        {name:"Veg Burger", price:120},
        {name:"Cheese Burger", price:180}
    ],

    pizza:[
        {name:"Cheese Pizza", price:250},
        {name:"Paneer Pizza", price:320}
    ],

    sandwich:[
        {name:"Veg Sandwich", price:100},
        {name:"Grilled Sandwich", price:150}
    ],

    fries:[
        {name:"French Fries", price:100},
        {name:"Peri Peri Fries", price:140}
    ],

    cold:[
        {name:"Coke", price:50},
        {name:"Cold Drink Bottle", price:70}
    ],

    cigarette:[
        {name:"Cigarette", price:20}
    ]

};


function showCategory(category){

    let container = document.getElementById("product-container");

    container.innerHTML = "";

    menuData[category].forEach(item=>{

        container.innerHTML += `

        <div class="menu-card">

            <h3>${item.name}</h3>

            <p>Premium Quality</p>

            <span>₹${item.price}</span>

            <button onclick="addToCart('${item.name}',${item.price})">
                Add To Cart
            </button>

        </div>

        `;

    });

}
let cart = [];


function addToCart(name, price){

    cart.push({
        name:name,
        price:price
    });

    updateCart();

    showToast(name + " added to cart");
}



function updateCart(){

    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");


    if(!cartItems) return;


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((item,index)=>{

        total += item.price;


        cartItems.innerHTML += `

        <div class="cart-item">

            <span>${item.name}</span>

            <b>₹${item.price}</b>

        </div>

        `;

    });


    if(cartTotal){
        cartTotal.innerText = total;
    }

}
