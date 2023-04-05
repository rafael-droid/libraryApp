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
            case "date.format":
                err.message  = `Pole powinno zawierać date`;
                break;

            default:
                break;
        }
    });
    return errors;
}
const wypozyczenieSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    ksiazka: Joi.number()
        .required()
        .error(errMessages),
    czytelnik: Joi.number()
        .required()
        .error(errMessages),
    data_wypozyczenia: Joi.date()
        .required()
        .error(errMessages),
    data_zwrotu: Joi.date()
        .optional()
        .allow("")
        .min(Joi.ref('data_wypozyczenia'))
        .error(errMessages)
});


module.exports = wypozyczenieSchema;