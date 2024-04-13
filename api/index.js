const express= require("express")
const app= express()
const dotenv= require("dotenv")
const products= require('./data/products');
dotenv.config();
const PORT= process.env.PORT;

const mongoose= require('mongoose')

//connect mongoDB
mongoose.connect(process.env.MONGOOSEDB_RUL).then(()=>console.log("db connect")).then((err)=>{
    err;    
})

app.listen(PORT ,() =>{
    console.log(`server listening on ${PORT}`);
});
