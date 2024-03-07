const redis=require('redis');
const redisurl='redis://127.0.0.1:6379';
const client=redis.createClient(redisurl);



console.log(client);

//basic redis to set and get method redis store the value in the form of key and value 

client.set('greeting','Welcome to the Nodejs World ! ');


client.get('greeting',(err,val)=>console.log(val));

// output on console : 'Welcome to the Nodejs World !'

// redis also store the nested hashes or nested records for the we use hset() and hget()  method ...

client.hSet('german','red','rot');

client.hGet('german','red',console.log);



/// also you cannot storedirectly directly real object of js into the redis if you need to store js real object then use used the json.stringify()method

client.set('colors',{red:'rojo'}) // this is not valid to store direclty into the redis 

client.set('colors',JSON.stringify({red:'rojo'}))

client.get('colors',(err,val)=>console.log(JSON.parse(val)));  // this are the valid method to store the js object into the redis 

