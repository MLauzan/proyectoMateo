const { validationResult } = require("express-validator");

const path = require("path");


const controller = {

    login: (req, res) => {
        res.render("./users/login");
    },

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
        
        return res.send('Ok, las validaciones se pasaron y no tienes errores');
        
    }

}



module.exports = controller