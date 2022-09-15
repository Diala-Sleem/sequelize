const express = require('express')
const app = express()
const db=require('./models')
require("dotenv").config();
const userRoutes = require('./routers/userRoutes')
const productRoutes = require("./routers/productRoutes");
const profileRoutes = require("./routers/profileRouters");


//---------------------------
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
//---------------------------
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", profileRoutes);


//---------------------------
db.sequelize.sync().then(()=>{}).catch(err=>console.log(err));
//---------------------------









app.listen(process.env.PORT, () =>
  console.log(`listening on PORT: ${process.env.PORT}`)
);