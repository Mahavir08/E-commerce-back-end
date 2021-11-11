const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDatabase = require("./connectDatabase");
const cors = require("cors");
const users = require('./routes/authRoutes');
const products = require('./routes/productRoutes');
const payment = require('./routes/paymentRoutes');
const cookieParser = require('cookie-parser');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "https://martacart.herokuapp.com",
  allowedHeaders:['Content-Type','Authorization']
}));
app.use(cookieParser());

dotenv.config({ path: "config/config.env" });

app.use('/api/',users);

app.use('/api/',products);

app.use('/api/', payment);

connectDatabase();

const port = process.env.PORT || 4000;

app.get('/token',(req,res)=>{
  res.cookie('token','ABCD').send('Successfull');
})

app.listen(port, () => {
  console.log(`Server Connected To Port ${port}`);
});