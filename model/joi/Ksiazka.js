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
            default:
                break;
        }
    });
    return errors;
}
const ksiazkaSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    tytul: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessages),
    autor: Joi.number()
        .required()
        .error(errMessages),
    wydawnictwo: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessages),
    dziedzina: Joi.string()
        .min(2)
        .max(100)
        .required()
        .error(errMessages),

});
module.exports = ksiazkaSchema;