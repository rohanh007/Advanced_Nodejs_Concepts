// // some interesting fact about nodejs

// Have you ever run a Node.js file and noticed some intriguing behavior? 
// Perhaps an HTTP request completing faster than expected or a peculiar order in which certain tasks finish. 
// In this example, we'll embark on a journey to understand the inner workings of Node.js, exploring the event loop, threadpool,
//  and the behavior of modules like FS (File System) and HTTPS. Let's dive in!

// **Observations and Questions:**
// When running a file with various pieces of code from different files, 
// we observed a sequence of events: an HTTP request, one hash, a file system call, and then the remaining three hashes.
//  Two burning questions emerged:
// 1. Why does one hash consistently appear before the file system result?
// 2. What causes the seemingly faster completion of the HTTP request compared to the file system?

// **The Event Loop and Modules:**
// Node.js relies on an event loop to handle asynchronous operations efficiently. Understanding how modules interact with this event loop is crucial. 
// Notably, the FS module and the crypto module's function pbkDF2 utilize a threadpool, whereas the HTTPS module operates independently.

// **Timeline Analysis and File Read Process:**
// Breaking down the timeline, we explored the read file function call, which involves fetching file statistics and reading the actual file.
//  The HTTP request stands out for its quick resolution, bypassing the threadpool and directly interacting with the operating system.

// **Threadpool and Module Interaction:**
// Visualizing the threadpool as a team of workers, we delved into how tasks are assigned. When initiating a file system call, 
// one worker starts fetching statistics while others handle hashing. The worker handling file statistics intelligently switches to 
// another task while waiting for the hard drive, leading to the observed order of completion.

// **Effect of Threadpool Size:**
// We posed a hypothetical question: What if we adjust the threadpool size? Increasing the threadpool size potentially enhances efficiency,
//  as additional workers can focus on specific tasks. Conversely, reducing the threadpool size extends the time taken for certain operations.

// **Wrap-Up and Next Steps:**
// Understanding these nuances becomes valuable in interviews, showcasing a deeper comprehension of Node.js internals. In the next section, 
// we'll explore the performance aspects of Node.js, providing insights into optimizing code for various scenarios.

// In conclusion, Node.js behavior is demystified by dissecting the event loop, threadpool dynamics, and module interactions.


/// code example :

process.env.UV_THREADPOOL_SIZE = 1;

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

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

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();