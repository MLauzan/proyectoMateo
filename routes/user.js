const express = require('express');

const router = express.Router();


const path = require('path');

const multer = require('multer');

const { body } = require('express-validator')


const usersController = require("../controllers/userController")

const validations = [
	body('fullName').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('surname').notEmpty().withMessage('Tienes que escribir un apellido'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	
]


router.get('/register', usersController.register);

router.post('/register', validations, usersController.processRegister);

router.get('/login', usersController.login);


module.exports = router;
