### This is the guide for the chatify backend

Technology selections
Scalable server => Nodejs
To store messages , in memory is not sufficient => Database => Instead of localDB i will use HarperDB as free host and NoSQL schema because of rapid change of db changes will occur with the time progresses.

### How to start server?
commands
Developer server=> npm run start:dev
Server => npm run start
In local run node server.js // later to be changed => nodemon for developer server restart upon changes npm i -D nodemon

### We need to comminicate with clients
So to make simplify calls, promised based and convinient approach we use axios

### Need to have connection details to harper db and some authentications keys
I am using dot env module loaded in the main script , 
why dot env?
It is better to keep sensitive data secured hidden from easy access 

### CORS
clients are in other origin (domain), and we need to make requests to server resources from clients which are in other domains, Hence we need to enable the cross functional resource sharing.

### Node
A framework for JS to write code more easily and convinietly

### Socket.io
Instead of request response mechanism in REST api , use socket io to perform communication in real time.