const express = require('express');
const app = express.Router();
const path = require('../db.js')

app.get('/' ,async (req, res) => {

    try {
        const transaction = await path.query("SELECT * FROM TRANSACTION");
        res.json(transaction.rows);
    } catch(e) {
        throw new Error(e.message)
    }
});

app.post('/', async (req, res) => {
    try {
        const {id, riceID , name} = req.body;
        const transaction = await path.query("INSERT INTO TRANSACTION VALUES($1, $2, $3) RETURNING *", [id, riceID, name]);
        res.json(transaction.rows)
    } catch(e){
        throw new Error(e.message)
    }
})

app.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const transaction = await path.query("DELETE FROM TRANSACTION WHERE Details_id = $1 RETURNING *", [id]);
        res.json(transaction.rows);
    } catch (e) {
        throw new Error(e.message)
    }
})

module.exports = app;