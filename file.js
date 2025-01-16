const fs=require("fs");
// fs.writeFileSync("./newfile.txt","hello from fs module");
// fs.writeFile("./newfile.txt","hello from fs module nihil raj",(err)=>{});
// const result=fs.readFileSync("./contacts.txt","utf-8")
// console.log(result);
fs.readFile("./contacts.txt","utf-8",(err,result)=>{  ////////////async or non blocking tech. always ask for callback and this do not return any thing on other hand sync req always return something.
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }
})
// fs.appendFileSync("./contacts.txt","\nprafull:+918821051320");
// fs.appendFileSync("./contacts.txt",`logged in at ${Date.now().toString()}\n`);
// fs.cpSync("./contacts.txt","./copyofcontacts.txt");
// fs.unlinkSync("./copyofcontacts.txt");
console.log(fs.statSync("./contacts.txt"));