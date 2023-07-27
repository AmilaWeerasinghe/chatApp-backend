import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();

const port = '4000';

app.use(cors()); // add the cors middle ware the created express app

const server = http.createServer(app); // we need to create a http server passing the express app that we built which is cors enabled

// get REST end point
app.get('/',(req,res)=>{
    res.status(200).send({"message": 'Hello from chatify backend'}); // let's send a JSON object as response to the request to the / end point
})

server.listen(port,()=> {
    console.log("server is listening in the port",port);
})