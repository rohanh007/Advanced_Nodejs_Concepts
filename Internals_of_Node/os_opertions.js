 
 //  LibUV os delegations  ......
 
//  we explore the inner workings of Node.js, specifically focusing on the pending OS tasks array within the event loop. 
//  To gain insights, a benchmarking program in a file named `async.js` is created. The program uses the `https` module to 
//  fetch the Google homepage, measuring the time it takes for the request. 

// The benchmarking code reveals that certain functions in the Node standard library, such as those for making HTTP requests, 
// leverage libuv and the underlying operating system instead of the thread pool. Multiple requests in the benchmark show simultaneous
// completion, indicating that the operating system, not the thread pool, handles the low-level network operations.
// Libuv delegates the request to the operating system, allowing it to decide how to manage the request process. 
// This approach ensures that there is no blocking of JavaScript code in the event loop, as the operating system independently handles the request.
// In summary, the combination of libuv and the operating system efficiently manages certain tasks, 
//providing a deeper understanding of Node.js's non-blocking nature.



// http example 

const https = require('https');

const start = Date.now();

function doRequest() {
  https
    .request('https://www.google.com', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();


// quetions  

//  Q1]  what function in node std library use the os,s async features ?
//  ans  --- almost everything around networking for all os  some 
//            other stuff is os specific 


//   Q2] How does this async stuff fit into the event loop ?
//   ans --   Tasks using the uderlying os are reflected in our pendingOS tasks array ..



