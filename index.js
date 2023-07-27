import express from 'express';
import http from 'http';
import cors from 'cors';
import Socket from 'socket.io';

const app = express();

const port = '4000';

app.use(cors()); // add the cors middle ware the created express app

const server = http.createServer(app); // we need to create a http server passing the express app that we built which is cors enabled

const io = new Socket.Server(server,{
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET','POST']
    }
})

io.on('connection',(socket)=>{
    console.log(`User connected: ${socket.id}`);
    // can perform the call back function for a socket connection
})

const data = [1,2,3,4,5]; // we need to serialise these data , but Express will automatically serialise this before sending.
// get REST end point
app.get('/',(req,res)=>{
    res.status(200).send({"message": 'Hello from chatify backend'}); // let's send a JSON object as response to the request to the / end point
})

server.listen(port,()=> {
    console.log("server is listening in the port",port);
})