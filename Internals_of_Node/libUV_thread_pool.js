// 1) who to manage thread pool multithreading tasks ???

// Libuv provides a thread pool in Node.js to handle expensive tasks efficiently.
// In our code, we're testing this by making five calls to the password hashing function (`pbkdf2`).
//  When we run the code, the first four calls take around 2 seconds in total, and then there's a pause before the fifth call 
//completes in 1 second.

// Imagine the thread pool as a group of workers. 
// The first four workers handle the first four calls together, making it seem like it's taking longer.
//  However, the fifth worker steps in later, completing its task in just 1 second.
// This shows how Node.js spreads the workload using the thread pool, making it more efficient for demanding functions like password hashing.


//node js example 

const crypto =require("crypto");


const start =Date.now(); // i took start time same for all function 

crypto.pbkdf2('a','b',100000 ,512 ,'sha512' ,()=>{

console.log('1:' ,Date.now()-start); 
})


crypto.pbkdf2('a','b',100000 ,512 ,'sha512' ,()=>{

    console.log('2:' ,Date.now()-start);
})

crypto.pbkdf2('a','b',100000 ,512 ,'sha512' ,()=>{

console.log('3:' ,Date.now()-start); 
})


crypto.pbkdf2('a','b',100000 ,512 ,'sha512' ,()=>{

    console.log('4:' ,Date.now()-start);
})
crypto.pbkdf2('a','b',100000 ,512 ,'sha512' ,()=>{

 console.log('5:' ,Date.now()-start); 
})
    
// in this example the thread pool default size is 4 hence when the first four crypto pbkdf2() 
//are run after the 5th one get some pause and then execute this is the example of who thread pool works in nodejs 


// 2] customize your threadpool size  ....

process.env.UV_THREADPOOL_SIZE =//number of thread pool you require;  
//("this uv_threadpool size can change the thread pool size of the node js its default are 4 we saw it last example")



// Important concept or quetions 


// Q1 ] can we use the thread pool for javascript code or can only nodejs functions use it ?

// ans : ---    we can write custom js that uses the thread pool   .


//  Q2]  what function un node std library use the thread pool ?

//  ans:--     all fs module functions some crypto stuff etc it is depend on os like windows, linux;


// Q3]  how does this thread pool stuff fit into the event loop ?

// ans :--- tasks running in the thread pool are the pending opertions our code templates




