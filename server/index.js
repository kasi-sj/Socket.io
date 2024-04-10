const socket = require("socket.io")

const io = socket(3000,{
    cors:{
        origin:["*"]
    }
})

io.on("connection",(socket)=>{
    console.log("New client connected")
    console.log(socket.id)
    socket.on("message",(message , room)=>{
        if(room == ""){
        console.log(message)
        socket.broadcast.emit("message",message)
        }else{
            socket.to(room).emit("message",message)
        }
    })
    socket.on("joinRoom",(room)=>{
        socket.join(room)
        console.log(room)
    })
})