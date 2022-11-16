-- Script para insertar datos de prueba en la tabla usuarios.

USE BolsaTrabajo;

-- Las contraseñas se encriptarán, estos son solo datos de prueba.

INSERT INTO usuarios (nombreUsuario, estado, dni, correo, password, tipo, nombre, apellidos, primeraVez)
    VALUES ("Admin", false, "88328816F", "admin@admin.com", "admin", 's', "Pepe", "Lolo", false),
            ("Juanito23", true, "88548816F", "juanito23@gmail.com", "juanito23", 'a', "Juan", "Azul", true),
            ("Paco2004", true, "99548816H", "paco2004@gmail.com", "paco2004", 'a', "Paco", "Verde", true),
            ("Manuel89", true, "88778816P", "manuel89@gmail.com", "manuel89", 't', "Manuel", "Rojas", false);

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