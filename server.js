const express = require('express');
const pool = require('./db.js');
const customer = require('./routes/customer.js');
const product = require('./routes/product.js');
const transaction = require('./routes/transaction.js');
const user = require('./routes/user.js');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/customer', customer);
app.use('/user', user);
app.use('/transaction', transaction);
app.use('/product', product);


app.listen(5500, () => {
    console.log("Hello");
})