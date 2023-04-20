const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const io = require("socket.io")(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})

const PORT = 3000

app.get('/', (req,res)=>{
    res.send("Server is running")
})

//io events
io.on('connection',(socket)=>{
    console.log('new connection ');
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
    socket.on("chat_message", (msg)=>{
        console.log("message is ",msg);
        io.emit("chat message", msg)
    })
})

server.listen(PORT, ()=>{
    console.log(` server is running on port ${PORT}`);
})
