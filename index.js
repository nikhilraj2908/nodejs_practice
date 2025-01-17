const http=require("http")
const fs=require("fs")

const server=http.createServer((req,res)=>{
    console.log("hello from server")
    const log=`${Date.now()} ${req.url} new req received\n`;
    fs.appendFile("userlog.txt",log,(err,result)=>{
        res.end("res end from server")
    })
 
})
server.listen(8000,()=>{console.log("server started")})