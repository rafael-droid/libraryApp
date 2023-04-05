const Joi = require('joi');
const errMessages = (errors) => {
    errors.forEach( err => {
        switch (err.code){
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message  = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message  = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "string.email":
                err.message  = `Pole powinno zawierać prawidłowy adres email`;
                break;
            case "string.pattern.base":
                err.message  = `Pole powinno zawierać cyfry`;
                break;
            case "string.alphanum":
                err.message  = `Pole nie powinno zawierać spacji`;
                break;
            default:
                break;
        }
    });
    return errors;
}
const czytelnikSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    imie: Joi.string()
        .min(2)
        .max(60)
        .required()
        .alphanum()
        .error(errMessages),
    nazwisko: Joi.string()
        .min(2)
        .max(60)
        .required()
        .alphanum()
        .error(errMessages),
    numerTel: Joi.string()
        .min(9)
        .max(9)
        .required()
        .pattern(/^[0-9]+$/)
        .error(errMessages),
    email: Joi.string()
        .email()
        .optional()
        .default("")
        .allow("")
        .error(errMessages),
    password: Joi.string()
        .min(2)
        .required()
});


module.exports = czytelnikSchema;