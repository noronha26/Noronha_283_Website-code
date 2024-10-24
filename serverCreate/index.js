
const http =require('http');
// console.log(http);
http.createServer((req,res)=>{
    console.log(req.url);
    res.end('hello')

}).listen(5000);