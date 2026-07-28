
// =====================================
// DEMO CAFE PREMIUM
// PART 4 - FIREBASE CONNECTION
// =====================================


// Firebase SDK load check

if(typeof firebase !== "undefined"){



// Yahan apne Firebase project ki details dalni hai

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",

projectId: "YOUR_PROJECT",

storageBucket: "YOUR_PROJECT.appspot.com",

messagingSenderId: "YOUR_SENDER_ID",

appId: "YOUR_APP_ID"

};




// Initialize Firebase

firebase.initializeApp(firebaseConfig);



const database = firebase.database();



// Export database

window.cafeDB = database;



console.log(
"Firebase Connected Successfully"
);



}

else{


console.log(
"Firebase SDK Not Loaded"
);


}







// ===============================
// SAVE ORDER FUNCTION
// ===============================


function saveOrder(order){


if(!window.cafeDB){

console.log("Database not connected");

return;

}



let orderId =
Date.now();



cafeDB
.ref("orders/"+orderId)
.set({


id:orderId,


customer:
order.customer || "Guest",


items:
order.items,


total:
order.total,


status:
"Pending",


time:
new Date().toLocaleString()



})

.then(()=>{


showToast(
"Order Placed Successfully"
);


})
.catch((error)=>{


console.log(error);


});


}







// ===============================
// UPDATE ORDER STATUS
// ===============================


function updateOrderStatus(
orderId,
status
){



if(!window.cafeDB)
return;



cafeDB
.ref(
"orders/"+orderId+"/status"
)
.set(status);



}








// ===============================
// GET LIVE ORDERS
// ===============================


function listenOrders(callback){



if(!window.cafeDB)
return;



cafeDB
.ref("orders")
.on(
"value",
(snapshot)=>{


let orders=[];



snapshot.forEach(
(child)=>{


orders.push(
child.val()
);


});



callback(orders);



});


}
