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


### Data transmission
Since i will be implementing a web app, i will need to transmit data over networks.
Usuall we can't just transmit complex data structures like arrays/ Lists through networks .Instead we can transmit string representations.
For that common pactrice is to use JSON/XML

### Why JSON?
simplicity, ease of use, and widespread support in various programming languages.

We can use JSON.stringify('ComplexDataStructure') and serialize the data structure to a simple JSON string which can be transmitted throught the networks adhering to there protocols

Later after tranmissiton we can deserialise the strings back to Javascript objects using
JSON.parse('deserialTrasmittedString'); and use the JS object inside nodeJs server, react.

The transmitted JSON string will be recieved to the reciever as a single string.

### Also Express will automatically serialise the data(object/ array) to strings before tranmission. But we get a JSON String, and need to make sure that at the recievers end to PARSE them back to JS objects to handle them in the JS code.

### Sockets

We listen to the socket emitted by client and , we can use a socket group to keep users of same group together.

We need a seperate intance of socket server class for that purpose.
inputs would be above created http server, to attach the new instance of socket server to the HTTP server
And add options to CORS policy to accept requests from other domain Ex: localhost:3000

implement a listener to listen when any client connects through the io socket and can perform necessary operations
 io.on(eventName, callback);
 eventName make to "connection" , which then listens for new socket connnection
 Use import {Server} since we have named exports in the module.(not default export)
 Namespaces can be used import * as util from 'utils';

 ### socket room
 We need many clients to get and send messages in a room like structure , that is publish message to many
 In socket.io there is a concept called 'rooms'
Definition => A room is an arbitrary channel that sockets can join and leave. It can be used to broadcast events to a subset of clients."
We can join/leave room in server callback function to listening to a connection by specifiying which room to join/leave

Messges in a certain room are not shared to the other rooms hence we have unique channel and subscribers .

We can listen for event emitted by client as well as emit events from srver and listen it in server.
socket.on(eventName, callback);
Catch specific eventName sentby client or server.
In server side socket.on is usually nested inside the io.on
In client side socket.on can be placed anywhere to listen to the event emmitted by the server.

### Socket send message to all
socket.to(room).emit() method in Socket.IO is used on the server-side to send a message or an event to all clients in a specific room, except the sender
We can send out a custom event other than the predefined events in socket io like (connect , disconnet , error).
Once this message is sent add an event listner in the react frontend application to capture this event and show in screen.

Use socket.emit, to emitt a message to the , emmitter who sent the front end message.

Save the chat room users socket ids in an array and send that data to client using event emmit , so we can track the list of users per room when new user joins a room.

### side note
you may find backtick character (`) which is used to create template literals. That is more flexible than normal strings



