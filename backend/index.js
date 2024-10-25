const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 5000;

require('dotenv').config()



//admin
//ghlplFD0uBaVzXG7


////// MIDDLEWARE SETUP ///////

app.use(express.json({limit:"25mb"}));
//app.use(express.urlencoded({limit:"25mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))



//// ALL ROUTES


const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route')
const reviewRoutes = require('./src/reviews/reviews.router')




app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/reviews",reviewRoutes);


main().then(()=>console.log("mongodb connected successfully")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})