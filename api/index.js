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

const databaSeeder= require('./databaSeeder')
const userRoute= require('./routes/User')


app.use(express.json())



//database Seeder router
app.use('/api/seed',databaSeeder)

//router for users
//api/users/login
app.use('/api/users',userRoute)


app.listen(PORT ,() =>{
    console.log(`server listening on ${PORT}`);
});
