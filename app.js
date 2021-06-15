const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");




require("dotenv/config")
const api = process.env.api;

//middleware
app.use(cors());
app.options("*", cors())
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(morgan('tiny'));
//app.use(authJwt)



//Routes
const productRoute = require("./Routes/products");
const categoryRoute = require("./Routes/category");
const orderRoute = require("./Routes/orders");
const usersRoute = require("./Routes/users");
conn = require("./config/keys").mongo;

//rouess
app.use(`${api}`,productRoute);
app.use(`${api}`,categoryRoute);
app.use(`${api}`,orderRoute);
app.use(`${api}`,usersRoute);

try{
    mongoose.connect(conn, {
        useNewUrlParser:true, 
        useUnifiedTopology:true, 
        useCreateIndex:true
    })

    if(conn)
        console.log("Datbase Connected");
    else
        console.log("An Error occured when connecting to Database");    

}catch(err){
    if(err)
        console.log("Error Occured");
};

PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}...`)
});