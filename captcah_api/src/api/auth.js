const express = require('express');

const authCtrl = require('../controllers/authCtrl');

const router = express.Router();

router.post('/login', (req, res) => {
    authCtrl.login(req, res);
});

router.post('/register', (req, res) => {
    authCtrl.register(req, res);
});

router.post('/logout', (req, res) => {
    authCtrl.logout(req, res);
});

router.post('/checkToken', (req, res) => {
    authCtrl.checkToken(req, res);
});


module.exports = router;
