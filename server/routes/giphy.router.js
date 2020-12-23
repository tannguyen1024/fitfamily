const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

router.get('/:search', (req, res) => {
    let search = req.params.search;
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${search}&limit=10&offset=0&rating=pg-13&lang=en`)
        .then((response) => {
            console.log('Search Results:', response.data)
            res.send(response.data);
        }).catch((error) => {
            console.log(error);
            res.send(500);
        })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const r = req.body;
    let m = r.selected;
    const query = `INSERT INTO "feed" (user_id, comment, type) VALUES ($1, $2, 'giphy');`;
    pool.query(query, [r.user_id, m]).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

module.exports = router;