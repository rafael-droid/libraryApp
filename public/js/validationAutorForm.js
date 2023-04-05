function validateForm(){
    const imie = document.getElementById('imie');
    const nazwisko = document.getElementById('nazwisko');

    const imieError = document.getElementById('errorImie');
    const nazwiskoError = document.getElementById('errorNazwisko');

    let errorSummary = "";

    resetErrors([imie, nazwisko],[imieError, nazwiskoError], errorSummary);
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

    if(!valid){
        errorSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}