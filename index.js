const { Server }=require('socket.io');
const io = new Server("https://video-chat-kcdh.onrender.com/",{
    cors:true  
});
const emailtoSocketId=new Map();
const SocketIdtoemail=new Map();
io.on('connection',(socket)=>{
    console.log('socket connected', socket.id);
    socket.on("room:join",(data)=>{
        console.log(data);
        const {email,room}=data;
        emailtoSocketId.set(email,socket.id);
        SocketIdtoemail.set(socket.id,email);
        io.to(room).emit("user:joined",{email,id: socket.id});
        socket.join(room);
        io.to(socket.id).emit("room:join",data);
    });
    socket.on("user:call",({to,offer})=>{
        console.log("offer has been sent");
        io.to(to).emit('incomming:call',{from:socket.id,offer});
    });
    socket.on("call:accepted",({to,ans})=>{
        console.log("offer has been accepted",ans);

        io.to(to).emit('call:accepted',{from:socket.id, ans});
    });
    socket.on("peer:nego:needed",({to,offer})=>{
        io.to(to).emit("peer:nego:needed",{from: socket.id,offer});
    })
    socket.on('peer:nego:done',({to,ans})=>{
        io.to(to).emit("peer:nego:final",{from:socket.id,ans});

    })
})