const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    let query = `SELECT weight.id as weight_id, "user".id as user_id, username, weight, date FROM "weight"
JOIN "user" ON "user".id = user_id WHERE private = false ORDER by date DESC;`;
    pool.query(query).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('weight.router.js error:', error)
        alert('Error with GET route in weight.router.js')
    })
});

router.get('/:id', (req, res) => {
    let query = `SELECT weight.id as weight_id, "user".id as user_id, username, weight, date FROM "weight"
JOIN "user" ON "user".id = user_id WHERE "user".id = $1 ORDER by date DESC;`;
    pool.query(query, [req.params.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('weight.router.js error:', error)
        alert('Error with GET route in weight.router.js')
    })
});

module.exports = router;