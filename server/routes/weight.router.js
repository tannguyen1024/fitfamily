const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    let query = `SELECT weight.id as weight_id, "user".id as user_id, display, username, weight, date FROM "weight"
JOIN "user" ON "user".id = user_id WHERE private = false ORDER by date DESC;`;
    pool.query(query).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('weight.router.js error:', error)
        alert('Error with GET route in weight.router.js')
    })
});

router.get('/:id', (req, res) => {
    let query = `SELECT weight.id as weight_id, "user".id as user_id, display, username, private, weight, date FROM "weight"
JOIN "user" ON "user".id = user_id WHERE "user".id = $1 ORDER by date DESC;`;
    pool.query(query, [req.params.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('weight.router.js error:', error)
        alert('Error with GET route in weight.router.js')
    })
});

router.get('/chart/:id', (req, res) =>{
    let query =`SELECT "user".id as user_id, username, json_agg(DISTINCT jsonb_build_object('date', TO_CHAR(date, 'MM-DD'), 'weight', weight)) AS weight
FROM "weight"
JOIN "user" ON "user".id = user_id 
WHERE "user".id = $1 
GROUP by "user".id;`;
    pool.query(query, [req.params.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('weight.router.js error:', error)
        alert('Error with GET route in weight.router.js')
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const r = req.body;
    const query = `INSERT INTO "weight" (user_id, weight, date, private) VALUES ($1, $2, $3, $4);`;
    pool.query(query, [r.user_id, r.weight, r.date, r.private]).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id;
    let query = `DELETE FROM weight WHERE id=$1;`
    pool.query(query, [id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

module.exports = router;