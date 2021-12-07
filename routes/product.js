const express = require('express');
const path = require('../db.js')
const app = express.Router();

app.get('/' ,async (req, res) => {

    try {
        const products = await path.query("SELECT * FROM PRODUCT");
        res.json(products.rows);
    } catch(e) {
        throw new Error(e.message)
    }

})

app.post('/', async (req, res) => {
    try {
        const {id, name , price} = req.body;
        const product = await path.query("INSERT INTO PRODUCT VALUES($1, $2, $3) RETURNING *", [id, name, price]);
        res.json(product.rows)
    } catch(e){
        throw new Error(e.message)
    }
})

app.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const product = await path.query("DELETE FROM PRODUCT WHERE Rice_id = $1 RETURNING *", [id]);
        res.json(product.rows);
    } catch (e) {
        throw new Error(e.message)
    }
})

module.exports = app;