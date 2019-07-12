const express = require('express');

const isAuth = require('../middleware/is-authenticated');
const authorize = require('../middleware/authorize');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/users/authenticate', userController.authenticateUser);
router.get('/users/', [isAuth, authorize(['Admin'])], userController.getUsers);
//router.get('/users/:id', isAuth, userController.getUser);

module.exports = router;