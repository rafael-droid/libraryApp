function validateForm(){
    const tytul = document.getElementById('title');
    const czytelnik = document.getElementById('czytelnik');
    const data1 = document.getElementById('date1');
    const data2 = document.getElementById('date2');

    const tytulError = document.getElementById('errorTitle');
    const czytelnikError = document.getElementById('errorCzytelnik');
    const data1Error = document.getElementById('errorDate1');
    const data2Error = document.getElementById('errorDate2');

    const nowString = Date.parse("Aug 9, 2021");
    console.log(nowString)

    let errorSummary = "";

    resetErrors([tytul,czytelnik, data1, data2],[tytulError, czytelnikError, data1Error, data2Error]);
    let valid = true;

                                                //Tytuł
    if(!checkRequired(tytul.value)){
        valid = false;
        tytul.classList.add("error-input");
        tytulError.innerText = "Pole jest wymagane";
    }

                                                //Czytelnik
    if(!checkRequired(czytelnik.value)){
        valid = false;
        czytelnik.classList.add("error-input");
        czytelnikError.innerText = "Pole jest wymagane";
    }

                                                //Data1
    if(!checkRequired(data1.value)){
        valid = false;
        data1.classList.add("error-input");
        data1Error.innerText = "Pole jest wymagane";
    }
    else if(!checkDate(data1.value)){
        valid = false;
        data1.classList.add("error-input");
        data1Error.innerText = "Pole powinno zawierać datę w formacie dd-MM-yyyy";
    }
    else if(checkDateIsAfter(data1.value, nowString)){                  //poprawić porównanie dat
        valid = false;
        data1.classList.add("error-input");
        data1Error.innerText = "Data nie może być z przyszłości";
    }

                                                //Data2
    if(!checkRequired(data2.value)){
        valid = false;
        data2.classList.add("error-input");
        data2Error.innerText = "Pole jest wymagane";
    }
    else if(!checkDate(data2.value)){
        valid = false;
        data2.classList.add("error-input");
        data2Error.innerText = "Pole powinno zawierać datę w formacie dd-MM-yyyy";
    }
    else if(checkDateIsAfter(data2.value, nowString)){                  //poprawić porównanie dat
        valid = false;
        data2.classList.add("error-input");
        data2Error.innerText = "Data nie może być z przyszłości";
    }
    else if(checkRequired(data2.value) && checkDate(data2.value) && !checkDateIsAfter(data1.value, data2.value)){
        valid = false;
        data2.classList.add("error-input");
        data2Error.innerText = "Data zwrotu powinna być późniejsza niż data wypożyczenia";
    }

    if(!valid){
        errorSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}
