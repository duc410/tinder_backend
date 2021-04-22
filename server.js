import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

//App Config 
const app=express();
const port =process.env.PORT ||8001
const password="jQG2ORlztX2AFcXl"
const connection_url=`mongodb+srv://admin:${password}@cluster0.4ulm4.mongodb.net/tinderdb?retryWrites=true&w=majority`

//Middleware
app.use(express.json())
app.use(Cors())

//Db config 
mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})

//API Endponts 
app.get('/', (req,res) =>
    res.status(200)
       .send("<h1>Hello Coomers</h1>")
);

app.post("/tinder/cards" , (req,res)=>{
    const dbCard=req.body;

    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500)
                .send(err)
        }else{
            res.status(201)
               .send(data)
        }
    })
});

app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500)
                .send(err)
        }else{
            res.status(200)
               .send(data)
        }
    })
})

//Listeners

app.listen(port ,()=> console.log(`Listening on port :${port}`))