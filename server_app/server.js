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
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const session = require('express-session')
const gravatar  = require('gravatar')

const PORT = 3000

const users = [
    {
        id:1, username:"Arzoo", password:"1234", emai:'a@a.com'
    },
    {
        id:2, username:"Vishal", password:"1234", emai:'v@v.com'
    },
]
passport.use(
    new localStrategy((username, password, done)=>{
        console.log(username, password);
        const user = users.find((user)=>user.username===username && user.password === password)
        if(user){
            console.log('user found');
            return done(null, user)
        }else{
            return done(null, false, {message: 'Invalid user credentials'})
        }
    })
)

passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    const user  = users.find((user)=>user.id ===id)
    done(null, user)
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(
    session({
        secret:'secret',
        resave: false,
        saveUninitialized:false
    })
)
app.use(passport.initialize())
app.use(passport.session())

app.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect("/")
    // res.send("Server is running")
})

app.post('/login',passport.authenticate('local', {
    // successRedirect:'/chat',
    failureRedirect:'/login',
    failureFlash:true
}),(req,res)=>{
     res.status(200)
     res.send({success:true, msg:"Successful"})
 })

//io events
io.on('connection',(socket)=>{
    console.log('new connection ');
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
    socket.on("chat_message", (msg)=>{
        console.log(msg);
        const user = req.user;
        const avatarUrl = gravatar.url(user.email,{s:'100', r:'x', d:'retro'},true )
        console.log("message is ",msg);
        io.emit("chat message",{user,  msg, avatarUrl})
    })
})

server.listen(PORT, ()=>{
    console.log(` server is running on port ${PORT}`);
})
