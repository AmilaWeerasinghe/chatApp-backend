import express from 'express';
import http from 'http';
import cors from 'cors';
import {Server} from 'socket.io';

const app = express();

const port = '4000';

app.use(cors()); // add the cors middle ware the created express app

const server = http.createServer(app); // we need to create a http server passing the express app that we built which is cors enabled

const io = new Server(server,{
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET','POST']
    }
})
const CHAT_BOT = 'ChatBot'; // to identify the server
let chatRoom = ''; // store chat room name
let allChatRoomUsers = []; // store all chat rooms, users ids

io.on('connection',(socket)=>{
    console.log(`User connected: ${socket.id}`);
    // can perform the call back function for a socket connection
    socket.on('join_room',(data)=>{
        //extract data sent from client with the join room event
        const {userName, userRoom} = data;


        //validations
        if(userName !== '' && userRoom !== ''){
            console.log(`${userName} is joining the ${userRoom}`);
            socket.join(userRoom); 

            //let's send a message to all
            let createdTime = Date.now();

            // messge to all in the room except the event emitter from client
            socket.to(userRoom).emit('recieve_message', {
                message: `${userName} entered the chat`,
                username: CHAT_BOT,
                createdTime
            });

            // event with message to the emitter client
            socket.emit('recieve_message',{
                message: `Welcome ${userName}`,
                username: CHAT_BOT,
                createdTime
            });

            chatRoom = userRoom;
            allChatRoomUsers.push({id:socket.id ,userName ,userRoom});
             //once a new user is added we need to update the current all users and send back the all users to the client
             //from above array filter only the users for this new event chat room 
             let chatRoomUsers = allChatRoomUsers.filter((user)=> {user.userRoom === userRoom});

             //let's send this chat room users details to all the current chat room to new sender and the rest of the room as well
             socket.to(userRoom).emit('chat_room_users',chatRoomUsers);
             socket.emit('chat_room_users',chatRoomUsers);
        }
    })
})

const data = [1,2,3,4,5]; // we need to serialise these data , but Express will automatically serialise this before sending.
// get REST end point
app.get('/',(req,res)=>{
    res.status(200).send({"message": 'Hello from chatify backend'}); // let's send a JSON object as response to the request to the / end point
})

server.listen(port,()=> {
    console.log("server is listening in the port",port);
})