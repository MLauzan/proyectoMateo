const express = require('express');
const router = express.Router();

const path = require('path');

const { body } = require('express-validator')


const usersController = require("../controllers/userController")

const validations = [
	body('fullName').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('surname').notEmpty().withMessage('Tienes que escribir un apellido'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body("confirmPassword")
	.notEmpty().withMessage('Tienes que volver a escribir tu contraseña').bail()
	.custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Las contraseñas no coinciden');
		} else {
			return value;
		}
	}).withMessage('Las contraseñas no coinciden')
]

const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")

router.get('/register', guestMiddleware, usersController.register);

router.post('/register', validations, usersController.processRegister);

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);

router.get('/profile', authMiddleware, usersController.profile);

router.get('/logout', usersController.logout);




module.exports = router;
