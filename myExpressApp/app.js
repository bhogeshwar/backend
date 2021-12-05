const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());
/*--importing routes*/
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');


const { METHODS } = require('http');
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: 'Content-type, Authoriztion, Origin, X-requested-width, Accept'

}))

//use routes

app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);






module.exports = app;
