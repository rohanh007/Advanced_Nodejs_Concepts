
//    EVENT LOOP EXPLANATION IN NODEJS USING FUNCTION AND WHILE LOOP EXAMPLE  ..............


// 2) Node Event loop 


// In the Node.js world, when we start a program, a single thread is automatically created to execute the code within an event loop. 
// Understanding this event loop is crucial for addressing performance concerns in Node. 
// To simplify comprehension, we'll create a fake code file, "loop.js."
// Upon initiating a Node application, it executes the contents of a file, symbolically represented as myFile.runContents.
// Following this execution, the event loop begins, depicted by a while loop, with each iteration referred to as a "tick." 
// The loop's continuation is determined by a condition checked with a helper function, shouldContinue. 
// When this function returns a truthy value, the event loop persists; otherwise, the program exits back to the terminal.



//Example :-

//node myFile.js  

myFile.runContents();

function shouldContinue(){

}

// Entire body executes in one 'tick'

while(shouldContinue){


}


//exit back to the terminal    


// 2) Event loop Implementation  ....


//explanation :- 
// In Node.js, the event loop controls the execution of code in a single thread. Three checks determine whether the event loop should continue: 
// 1) It looks for pending functions from `setTimeout`, `setInterval`, or `setImmediate`. If any are found, the loop continues.
// 2) It checks for pending operating system tasks, like an HTTP server listening for requests. 
// 3) It looks for any ongoing long-running operations, such as file system module calls. 
// To simulate these checks, imaginary arrays (`pendingTimers`, `pendingOSTasks`, `pendingOperations`) keep track of pending tasks. 
// The `shouldContinue` function returns true if any arrays have pending tasks, allowing the loop to continue. 
// Understanding these checks helps grasp Node.js performance. 



//Example :-

//node myFile.js  


const pendingTimers =[];
const pendingOSTasks =[];
const pendingOperations =[];


//New timers , tasks , operations are recorded from myfile running 
myFile.runContents();

function shouldContinue(){

    //check one : any pending setTimeout ,setInterval ,setImmediate ?
    //check two : any Pending Os tasks (like server, http ,listening on port);
   // check three :Any Pending long running operations (like fs module ..);

   return pendingOSTasks.length || pendingOperations.length || pendingTimers.length ;

}

// Entire body executes in one 'tick'

while(shouldContinue){


}


//exit back to the terminal  



// 3) Event Loop ticks 

// Explanation   :-
// 1. **Check Pending Timers:**
//    - Node examines pending timers, looking for functions associated with expired `setTimeout` and `setInterval`.
//    - Executes relevant callbacks for timers that have completed.

// 2. **Check Pending OS Tasks and Operations:**
//    - Node reviews pending operating system tasks and operations.
//    - Calls relevant callbacks for completed tasks or triggered events, like server requests or file retrievals.

// 3. **Pause and Wait for Events:**
//    - Node temporarily pauses execution.
//    - Waits for new events such as completed tasks, operations, or expiring timers.

// 4. **Check Pending Immediate Timers:**
//    - After the pause, Node focuses on pending timers again.
//    - Specifically looks for functions registered with `setImmediate`.
//    - Calls the relevant callbacks for immediate timers.

// 5. **Handle Close Events:**
//    - Node handles any close events.
//    - Useful for running cleanup code before the event loop completes, preventing loose ends.

// // Understanding these five steps helps developers navigate the event loop, ensuring efficient and organized execution in Node.js applications.

// Example : -

// Entire body executes in one 'tick'

while(shouldContinue){
  // 1) Node looks at pendingTimers and sees if any functions 
  // are ready to be called . setTimeout , setInterval 

   // 2) Node looks at pendingostasks and  pendingOperations 
   // and calls relevant callbacks 

   // 3) Pause execution . continue when ....

   // - a new pendingOSTask is done
   // - a new pendingOperations is done  
   // - a timer is about to complete
   
   // 4) look at pendingTimers . call any setImmediate 

   //5) handle any 'close' events  like clean up code and also clean all 
 
}
