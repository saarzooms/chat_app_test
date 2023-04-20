const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

const PORT = 3000

app.get('/', (req,res)=>{
    res.send("Server is running")
})

server.listen(PORT, ()=>{
    console.log(` server is running on port ${PORT}`);
})
