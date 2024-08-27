const express =require ("express");
var http =require ("http");
const cors =require ("cors");
const exp = require("constants");
const app= express();
const port =process.env.PORT || 5000 ;
var server =http.createServer(app);
var io = require("socket.io")(server ,{
    cors:
    {
        origin:"*"
    }
});
app.use(express.json());
app.use(cors());
io.on("connection",()=>{
    console.log("Connected");
});
server.listen(port,()=>{
    console.log("Server started");
});