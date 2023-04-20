import React, { useState } from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [msgData, setMsgData] = useState("")

    const socket = io('http://localhost:3000')
    //on message or socket change call this
    useEffect(()=>{
        socket.on("chat message",(msg)=>{
            setMessages([...messages,msg])
        })
    },[messages,socket])

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(msgData!==""){
            console.log(msgData);
            socket.emit("chat_message", msgData)
            setMsgData("")
        }
    }
    const handleChange = (e)=>{
        setMsgData(e.target.value)
    }
  return (
    <div>
        <ul>
            {messages.map((message,i)=>(<li key={i}>{message}</li>))}
        </ul>
        <form onSubmit={handleSubmit}>
            <input type="text" value={msgData} onChange={handleChange}/>
            <button type="submit">Send</button>
        </form>
    </div>
  )
}

export default Chat