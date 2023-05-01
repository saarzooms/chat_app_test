import React, { useState } from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import gravatar from 'gravatar'

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [msgData, setMsgData] = useState("")
    const [user, setUser] = useState({})
    const socket = io('http://localhost:3000')
    //on message or socket change call this
    useEffect(()=>{
        socket.on("chat message",(msg)=>{
            setMessages([...messages,msg])
        })
    },[messages,socket])
    useEffect(() => {
        fetch('http://localhost:3000/user')
          .then((res) => res.json())
          .then((user) => setUser(user));
      }, []);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(msgData!==""){
            console.log(msgData);
            const avatarUrl = gravatar.url(user.email, {s:'100',r:'x',d:'retro'},true)
            socket.emit("chat_message", {user, msg:msgData, avatarUrl})
            setMsgData("")
        }
    }
    const handleChange = (e)=>{
        setMsgData(e.target.value)
    }
  return (
    <div>
        <ul>
            {messages.map((message,i)=>(<li key={i}><img src={message.avatarUrl} alt="avatar"/><span>{message.user.username}</span>{message.msg}</li>))}
        </ul>
        <form onSubmit={handleSubmit}>
            <input type="text" value={msgData} onChange={handleChange}/>
            <button type="submit">Send</button>
        </form>
    </div>
  )
}

export default Chat