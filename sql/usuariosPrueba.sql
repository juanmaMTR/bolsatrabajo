-- Script para insertar datos de prueba en la tabla usuarios.

USE BolsaTrabajo;

-- Pass de prueba admin --> admin

INSERT INTO usuarios (nombreUsuario, estado, dni, correo, password, tipo, nombre, apellidos, primeraVez)
    VALUES ("Juanito23", true, "88548816F", "juanito23@gmail.com", "$2y$10$TyAS0KaRfBJHUzJF8wxLPOXCpWKeJH42HVhnSufnTQ6PV3tFSFPpO", 'a', "Juan", "Azul", true),
            ("Paco2004", true, "99548816H", "paco2004@gmail.com", "$2y$10$b4IN3VgzYDZ/X3Q6CwfpCe/KlKlBpQYU5KifLK3z/InxIN4bkWtDy", 'a', "Paco", "Verde", true),
            ("Manuel89", true, "88778816P", "manuel89@gmail.com", "$2y$10$aRQIJcfGF7HCR/lRBQfKb.fsk3uMMyjvLsBA/Cdi8fNzOxGhTzugm", 't', "Manuel", "Rojas", false);

INSERT INTO familiasProfesionales(nombreFamilia)
    VALUES ("Informática"),
            ("Administración y Gestión"),
            ("Comercio y Marketing"),
            ("Edificación y Obra Civil"),
            ("Electricidad y Electrónica"),
            ("Hostelería y Turismo"),
            ("Imagen y Sonido"),
            ("Industrias Alimentarias"),
            ("Madera, Mueble y Corcho"),
            ("Química"),
            ("Sanidad"),
            ("Transporte y Mantenimiento de Vehículos"),
            ("Textil, Confección y Piel"),
            ("Vestuario y Moda"),
            ("Otros");