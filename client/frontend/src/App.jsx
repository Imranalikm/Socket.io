import { useState } from 'react'
import io from 'socket.io-client'
const socket =io.connect("http://localhost:3001")
import { useEffect } from 'react'

function App() {
  const [message,setMessage] =useState("")
  const [messageRecieved,setMessageRecieved]=useState("")
  const sendMessage=()=>{
     socket.emit("send_message",{message});
  }
  
  useEffect(()=>{
     socket.on("recieve_message",(data)=>{
      setMessageRecieved(data.message)
     })
  },[])

  
  return (
    <>
     <div className="App">
      <input placeholder='Message....' type="text"  onChange={(e)=>{
        setMessage(e.target.value);
      }}/>
      <button onClick={sendMessage} > Send message</button>
      <h1>Message Recieved:</h1>
        {
          messageRecieved
        }
     </div>
    </>
  )
}

export default App
