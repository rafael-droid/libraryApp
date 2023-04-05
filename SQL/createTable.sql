CREATE SCHEMA IF NOT EXISTS `tin-project`;
CREATE TABLE IF NOT EXISTS `tin-project`.`Autor`
    (   `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `imie` VARCHAR(50) NOT NULL,
        `nazwisko` VARCHAR(50) NOT NULL,
        PRIMARY KEY (`_id`),
        UNIQUE INDEX   `autor_id_UNIQUE` (`_id` ASC)
    )   ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-project`.`Czytelnik`
    (
        `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `imie` VARCHAR(50) NOT NULL,
        `nazwisko` VARCHAR(50) NOT NULL,
        `numerTel` VARCHAR(9) NOT NULL,
        `email` VARCHAR(50) NULL,
        `password` VARCHAR(50) NOT NULL,
        PRIMARY KEY (`_id`),
        UNIQUE INDEX   `czytelnik_id_UNIQUE` (`_id` ASC)
    )   ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-project`.`Ksiazka`
(
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tytul` VARCHAR(50) NOT NULL,
    `autor_id` INT UNSIGNED NOT NULL,
    `wydawnictwo` VARCHAR(30) NOT NULL,
    `dziedzina` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX   `ksiazka_id_UNIQUE` (`_id` ASC),
    CONSTRAINT `autor_fk` FOREIGN KEY (`autor_id`) REFERENCES `tin-project`.`Autor` (`_id`)
    )   ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-project`.`Wypozyczenie`
(
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `czytelnik_id` INT UNSIGNED NOT NULL,
    `ksiazka_id` INT UNSIGNED NOT NULL,
    `data_wypozyczenia` DATE NOT NULL,
    `data_zwrotu` DATE NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX   `wypozyczenie_id_UNIQUE` (`_id` ASC),
    CONSTRAINT `czytelnik_fk` FOREIGN KEY (`czytelnik_id`) REFERENCES `tin-project`.`Czytelnik` (`_id`),
    CONSTRAINT `ksiazka_fk` FOREIGN KEY (`ksiazka_id`) REFERENCES `tin-project`.`Ksiazka` (`_id`)
    )   ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-project`.`Autor` (`_id`, `imie`,`nazwisko`) VALUES
    (1, 'Jan', 'Kowalski'),
    (2, 'Adam', 'Nowak');

INSERT IGNORE INTO `tin-project`.`Czytelnik` (`_id`, `imie`,`nazwisko`, `numerTel`, `email`) VALUES
    (1, 'Jan', 'Kowalski', '500500500', 'jan.kowalski@wypo.com'),
    (2, 'Adam', 'Nowak', '501501501', null);

INSERT IGNORE INTO `tin-project`.`Ksiazka` (`_id`, `tytul`,`autor_id`, `wydawnictwo``, `dziedzina``) VALUES
    (1, 'Pan Tadeusz', 1, 'Znak', 'Horror'),
    (2, 'Oda do wolności', 1, 'Znak', 'Fantastyka');

INSERT IGNORE INTO `tin-project`.`Wypozyczenie` (`_id`, `czytelnik_id`,`ksiazka_id`, `data_wypozyczenia`, `data_zwrotu`) VALUES
    (1, 1, 2, '2020-01-01', '2020-02-02'),
    (2, 2, 1, '2021-01-01', null);