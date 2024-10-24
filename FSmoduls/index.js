const fs=require('fs');
// console.log(_dirname,_filename);
// fs.writeFileSync('./public/hello.html','<h1>hello evryone</h1>');

// fs.readFile('./public/hello.html','utf-8',(error,data)=>{
//     console.log(data);

// });
// fs.appendFileSync('./public/hello.txt',' and updated')
// fs.existsSync('./public/hello.txt')
// fs.existsSync(`${_dirname}/public/hello.txt`)
fs.unlinkSync('./public/hello.html');