Overview
This project utilizes Redis in conjunction with Node.js and MongoDB to enhance performance through caching. Redis, an in-memory data store, is employed as a caching server to speed up read operations, providing a quick and efficient way to retrieve frequently requested data.

Technologies Used
Node.js
MongoDB
Redis
Why Redis?
Redis serves as a caching layer to optimize read operations. Its in-memory nature allows for lightning-fast data retrieval, making it an excellent choice for scenarios where quick access to frequently accessed data is crucial.

How It Works
Setup:

The React application communicates with the Express server.
Express, in turn, interacts with MongoDB using Mongoose for data retrieval.
Introduction of Redis:

Redis is introduced as a caching server between Mongoose and MongoDB.
Before issuing a query to MongoDB, Mongoose checks with the Redis cache server.
Caching Process:

If the query has been executed before, Redis returns the cached result immediately.
If the query is new, Redis forwards it to MongoDB, stores the result, and returns the data to Mongoose.
Efficient Lookups:

Subsequent identical queries bypass MongoDB entirely.
Redis performs a quick key-value lookup based on the query and returns the cached result.