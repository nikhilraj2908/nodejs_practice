const http=require("http")
const fs=require("fs")
const url=require("url");
const server=http.createServer((req,res)=>{
    console.log("hello from server")
    if(req.url==="/favicon.ico"){return res.end()}
    const log=`${Date.now()} ${req.url} new req received\n`;
        const urldata=url.parse(req.url,true);
    console.log(urldata);
    fs.appendFile("userlog.txt",log,(err,result)=>{
       switch(urldata.pathname){
        case "/":
            
            const name=urldata.query.search;
            res.end(`hello ${name}`);
            break;
        case "/about":
            res.end("about is the parameter");
            break;
        default :
        res.end("this is default");
        break;
       }
    })

 
})
server.listen(8000,()=>{console.log("server started")})