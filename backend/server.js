require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const reviewsRoutes = require('./routes/reviewsRoutes')
const ftwRoutes = require('./routes/ftdRoutes')
const pincodeRoutes = require('./routes/pincodeRoutes')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/reviews', reviewsRoutes)
app.use('/ftws', ftwRoutes)
app.use('/pincodes', pincodeRoutes)

app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.status(500).json({error: "Something went wrong!!"})
})

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("Connected to database")})
.catch((error)=>{console.log(error)})

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
  });

app.listen(PORT, ()=>{
    console.log("Listening to PORT", PORT)
})