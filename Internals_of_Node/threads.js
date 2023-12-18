
// Quetions is Is node is Single Threaded  ?? .....

//Certainly! The idea here is to explore a common misunderstanding about Node.js. 
//While many say it's single-threaded due to its event loop, the reality is more nuanced. 
//The event loop operates in a single thread, but certain functions in Node.js, found in the standard library, don't strictly adhere to this single-threaded nature. 


//Let me Expalin  :-
//a file named `threads.js` is created, aiming to run a computationally intensive function (PBKDF2) and measure the time it takes.
// This practical demonstration will show that not all of Node.js is confined to a single thread, contrary to common belief.
// The next step involves adding code to measure the execution time of the PBKDF2 function.


const crypto =require("crypto");


const start =Date.now(); // i took start time same for all function 

crypto.pbkdf2('a','b',100000 ,512 ,'sha512' ,()=>{

console.log('1:' ,Date.now()-start); 
})


crypto.pbkdf2('a','b',100000 ,512 ,'sha512' ,()=>{

    console.log('2:' ,Date.now()-start);
})

// When above function are run then they shows similar time but the nodejs is single threaded then why they not execute one after another 

//In the exploration of Node.js, a file named `threads.js` is created to test if Node.js is genuinely single-threaded.
// The PBKDF2 function from the crypto module is used to measure execution time. Duplicating the function call unexpectedly yields concurrent results, 
//challenging the notion of strict single-threaded behavior in Node.js. 
 //The observed behavior, where both calls appear to operate simultaneously, prompts further investigation into Node.js threading.


 