const express = require('express');
const path = require('../db.js');
const app = express.Router();

app.get('/' ,async (req, res) => {

    try {
        const customers = await path.query("SELECT * FROM CUSTOMER");
        res.json(customers.rows);
    } catch(e) {
        throw new Error(e.message)
    }

});

app.post('/', async (req, res) => {
    try {
        const {id, first , last, no, address} = req.body;
        const customer = await path.query("INSERT INTO CUSTOMER VALUES($1, $2, $3, $4, $5) RETURNING *", [id, first, last, no, address]);
        res.json(customer.rows)
    } catch(e){
        throw new Error(e.message)
    }
})

app.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const customer = await path.query("DELETE FROM CUSTOMER WHERE Customer_id = $1 RETURNING *", [id]);
        res.json(customer.rows);
    } catch (e) {
        throw new Error(e.message)
    }
})

module.exports = app;