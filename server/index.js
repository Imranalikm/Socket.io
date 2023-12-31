const express = require('express')
const app =express()
const http =require('http')
const {Server} =require('socket.io')
const cors =require('cors')
const server =http.createServer(app)

app.use(cors());

const io =new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
   console.log(`user Connected:${socket.id}`)

   socket.on("send_message",(data)=>{
   socket.broadcast.emit("recieve_message",data)
   })
})
const PORT =3001
server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);

})
