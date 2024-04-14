const router= require ('express').Router();
const User= require ('./model/User')
const users= require('./data/users')
const Product= require('./model/Product')
const products= require('./data/products')
const AsynHandler= require('express-async-handler')

router.post('/users', async (req,res)=>{
await User.deleteMany({});
const UserSeeder= await User.insertMany(users);
res.send({UserSeeder})
})  

router.post('/products', async (req,res)=>{
    await Product.deleteMany({});   
    const ProductSeeder= await Product.insertMany(products);
    res.send({ProductSeeder})
    })  

module.exports=router;