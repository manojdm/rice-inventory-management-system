const express = require('express');
const app = express.Router();
const path = require('../db.js')

app.get('/' ,async (req, res) => {

    try {
        const users = await path.query("SELECT * FROM USERS");
        res.json(users.rows);
    } catch(e) {
        throw new Error(e.message)
    }

})

app.post('/', async (req, res) => {
    try {
        const {userID , first , last , user , address , password} = req.body;
        const users = await path.query("INSERT INTO USERS VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [userID ,first, last, user , address , password]);
        res.json(users.rows)
    } catch(e){
        throw new Error(e.message)
    }
})

app.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const users = await path.query("DELETE FROM USERS WHERE user_id = $1 RETURNING *", [id]);
        res.json(users.rows);
    } catch (e) {
        throw new Error(e.message)
    }
})

module.exports = app;