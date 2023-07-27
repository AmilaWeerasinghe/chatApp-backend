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


### I will be using ES6 imports instead of CJS imports
import <desiredName> from 'moduleName';
Reasons:
1.Asynchronous loading of modules on demand. (CJS imports are synchronous hence we need to wait till the modules are loaded in order to execure the current script). (Performance improvement)
2. Namespace imports => Import multiple exports into a single NameSpace and can use them.
import * as utils from './utils.js';
3.Named Exports and Imports => helps to maintain a cleaner code 
4. Supports cicular dependencies => without runtime errors

### I will enable "type": "modules" in package.json , so that all the js files will be treated as modules.
So now we can easily import using ES6 import . 
Else to ES6 synstax to work we need to rename files to .mjs or add flag to --experimental-modules.

#### Built in http module
to make sure we create a server based on http protocols
And we use express to make routing , and access to req/res objects , middleware support and error handling to done easily.