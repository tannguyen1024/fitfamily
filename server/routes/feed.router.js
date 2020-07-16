const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    let query = `SELECT feed.id as feed_id, "user".id as user_id, username, display, comment, date, picture, upvotes, weight FROM "feed" JOIN 
"user" ON "user".id = user_id
ORDER by date DESC;`;
    pool.query(query).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('feed.router.js error:', error)
        alert('Error with GET route in venue.router.js')
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const r = req.body;
    const query = `INSERT INTO "feed" (user_id, comment) VALUES ($1, $2);`;
    pool.query(query, [r.user_id, r.comment]).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id;
    let query = `DELETE FROM feed WHERE id=$1;`
    pool.query(query, [id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id;
    let query = `UPDATE feed SET "upvotes" = "upvotes" + 1 WHERE id=$1;`
    pool.query(query, [id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

module.exports = router;