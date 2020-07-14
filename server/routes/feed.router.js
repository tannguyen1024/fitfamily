const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    let query = `SELECT feed.id as feed_id, "user".id as user_id, username, comment, date, picture, upvotes FROM "feed" JOIN 
"user" ON "user".id = user_id
ORDER by date DESC;`;
    pool.query(query).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('feed.router.js error:', error)
        alert('Error with GET route in venue.router.js')
    })
});

module.exports = router;