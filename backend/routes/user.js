const express = require('express');
const router = express.Router();
const {loginUser,signUpUser} = require('../controllers/user.js')


// login route

router.post('/login', loginUser);

// sign in route
router.post('/register',signUpUser);


module.exports = router;