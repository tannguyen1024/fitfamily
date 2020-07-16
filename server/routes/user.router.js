const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const picture = req.body.picture;
  const display = req.body.display;
  const password = encryptLib.encryptPassword(req.body.password);
console.log('reqbody:', req.body)
  const queryText = 'INSERT INTO "user" (username, password, email, phone, picture, display) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
  pool.query(queryText, [username, password, email, phone, picture, display])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

router.put('/:id', (req, res, next) => {
  const user_id = req.params.id;
  const username = req.body.username;
  const display = req.body.display;
  const email = req.body.email;
  const phone = req.body.phone;
  const picture = req.body.picture;
  console.log('reqbody:', req.body)
  const queryText = 'UPDATE "user" SET "username" = $1, "display" = $2, email = $3, phone = $4, picture = $5 WHERE id=$6;';
  pool.query(queryText, [username, display, email, phone, picture, user_id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
