const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");


const User = require('../models/User');

const controller = {
	register: (req, res) => {
		return res.render("./users/register");
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render("./users/register", {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('./users/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			confirmPassword: bcryptjs.hashSync(req.body.confirmPassword, 10),

		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/user/login');
	},
	login: (req, res) => {

		return res.render('./users/login');
	},
	loginProcess: (req, res) => {

		let userToLogin = User.findByField('email', req.body.email);

		if (userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if (req.body.remember_user) {
					res.cookie('imail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile');
			}
			return res.render('./users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('./users/login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
	profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('imail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = controller;