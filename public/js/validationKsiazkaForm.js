function validateForm(){
    const tytul = document.getElementById('title');
    const autor = document.getElementById('author');
    const wydawnictwo = document.getElementById('publishingHouse');
    const dziedzina = document.getElementById('Dziedzina');

    const tytulError = document.getElementById('errortitle');
    const autorError = document.getElementById('errorauthor');
    const wydawnictwoError = document.getElementById('errorPublishingHouse');
    const dziedzinaError = document.getElementById('errorDziedzina');

    let errorSummary = "";

    resetErrors([tytul,autor,wydawnictwo,dziedzina],[tytulError,autorError,wydawnictwoError,dziedzinaError]);
    let valid = true;

                                            //Tytuł
    if(!checkRequired(tytul.value)){
        valid = false;
        tytul.classList.add("error-input");
        tytulError.innerText = "Pole jest wymagane";
    }
    else if(!checkTextLengthRange(tytul.value, 2, 60)) {
        valid = false;
        tytul.classList.add("error-input");
        tytulError.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

                                            // Autor
    if(!checkRequired(autor.value)){
        valid = false;
        autor.classList.add("error-input");
        autorError.innerText = "Pole jest wymagane";
    }
                                            // Wydawnictwo
    if(!checkRequired(wydawnictwo.value)){
        valid = false;
        wydawnictwo.classList.add("error-input");
        wydawnictwoError.innerText = "Pole jest wymagane";
    }
    else if(!checkTextLengthRange(wydawnictwo.value, 2, 60)) {
        valid = false;
        wydawnictwo.classList.add("error-input");
        wydawnictwoError.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

                                            //Dziedzina
    if(!checkRequired(dziedzina.value)){
        valid = false;
        dziedzina.classList.add("error-input");
        dziedzinaError.innerText = "Pole jest wymagane";
    }
    if(!valid){
        errorSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}