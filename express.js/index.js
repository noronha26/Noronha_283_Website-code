const express=require('express');
const app =express();

app.use(express.json());

app.get('/:name?',(req,res)=>{
    res.send('hello everyone')
    console.log(req.query)
    console.log(req.params)
 

});
app.get('/contact',(req,res)=>{
    res.send('contact api')
});
app.post('/contact',(req,res)=>{
    console.log(req.body);
    res.send('post route')
});


app.listen(5000);