function validateForm(){
    const imie = document.getElementById('firstName');
    const nazwisko = document.getElementById('lastName');
    const numer = document.getElementById('numberPhone');
    const eMail = document.getElementById('e-mail');

    const imieError = document.getElementById('errorFirstName');
    const nazwiskoError = document.getElementById('errorlastName');
    const numerError = document.getElementById('errornumberPhone');
    const eMailError = document.getElementById('error-mail');

    let errorSummary = "";

    resetErrors([imie, nazwisko,numer],[imieError, nazwiskoError,numerError]);
    let valid = true;

    if(!checkRequired(imie.value)){
        valid = false;
        imie.classList.add("error-input");
        imieError.innerText = "Pole jest wymagane";
    }
    else if(!checkTextLengthRange(imie.value, 2, 60)) {
        valid = false;
        imie.classList.add("error-input");
        imieError.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if(!checkRequired(nazwisko.value)){
        valid = false;
        nazwisko.classList.add("error-input");
        nazwiskoError.innerText = "Pole jest wymagane";
    }
    else if(!checkTextLengthRange(nazwisko.value, 2, 60)) {
        valid = false;
        nazwisko.classList.add("error-input");
        nazwiskoError.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if(!checkRequired(numer.value)){
        valid = false;
        numer.classList.add("error-input");
        numerError.innerText = "Pole jest wymagane";
    }
    if(!checkNumber(numer.value)){
        valid = false;
        numer.classList.add("error-input");
        numerError.innerText = "Pole powinno zawierać cyfry";
    }
    else if(!checkNumberRange(numer.value, 100000000, 999999999)) {
        valid = false;
        numer.classList.add("error-input");
        numerError.innerText = "Pole powinno zawierać 9 cyfr";
    }

    if(!checkFree(eMail.value)) {

        if (!checkTextLengthRange(eMail.value, 5, 60)) {
            valid = false;
            eMail.classList.add("error-input");
            eMailError.innerText = "Pole powinno zawierać od 5 do 60 znaków";
        }
        if (!checkEmail(eMail.value)) {
            valid = false;
            eMail.classList.add("error-input");
            eMailError.innerText = "Pole powinno zawierać prawidłowy adres email";
        }
    }

    if(!valid){
        errorSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}