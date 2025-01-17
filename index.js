const http=require("http")

const server=http.createServer((req,res)=>{
    console.log("hello from server")
    res.end("res end from server")
})
server.listen(8000,()=>{console.log("server started")})