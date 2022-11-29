/**
 * @file database.sql
 * @brief SQL script for the script tables and database.
 * @authors Juan Manuel Toscano Reyes <jtoscanoreyes.guadalupe@alumnado.fundacionloyola.net>
 *          Juan Diego Carretero Granado <jcarreterogranado.guadalupe@alumnado.fundacionloyola.net>
 *          Angel Manuel Fernández Baños <amfernandezbanos.guadalupe@alumnado.fundacionloyla.net>
 */

-- Create database
CREATE DATABASE BolsaTrabajo;
-- Use the database
USE BolsaTrabajo;
-- Create the table Usuarios
CREATE TABLE usuarios(
    idUsuario int unsigned not null auto_increment primary key,
    nombreUsuario varchar(100) unique not null,
    estado boolean null,
    dni char(9) not null unique,
    correo varchar(255) not null,
    password varchar(255) not null,
    tipo char(1) not null default 'a' check (tipo in ('s','t','a')) ,
    nombre varchar(100) not null,
    apellidos varchar(100) not null,
    primeraVez boolean not null
);
-- Create table Familias Profesionales
CREATE TABLE familiasProfesionales(
    idFamilia tinyint unsigned not null auto_increment primary key,
    nombreFamilia varchar(100) not null unique
);
-- Create table Ciclos
CREATE TABLE ciclos(
    idCiclo tinyint unsigned not null auto_increment primary key,
    nombreCiclo varchar(100) not null unique,
    idFamilia tinyint unsigned not null,
    CONSTRAINT fk_idFamilia FOREIGN KEY (idFamilia) REFERENCES familiasProfesionales(idFamilia)
);
-- Create the table Ciclos_usuarios
CREATE TABLE ciclos_usuarios(
    idCiclo tinyint unsigned not null,
    idUsuario int unsigned not null,
    CONSTRAINT pk_ciclos_usuarios PRIMARY KEY (idCiclo,idUsuario),
    CONSTRAINT fk_idUsuario FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario),
    CONSTRAINT fk_idCiclo FOREIGN KEY (idCiclo) REFERENCES ciclos(idCiclo)
);
-- Create the table Curriculum
CREATE TABLE curriculum(
    idCurriculum int unsigned not null auto_increment primary key,
    idUsuario int unsigned not null,
    nombreContacto varchar(100) not null,
    apellidoContacto varchar(100) not null,
    fechaNacimiento date not null,
    correoContacto varchar(255) not null,
    telefonoContacto char(9) not null,
    especialidad varchar(50) null,
    sobreMi varchar(150) null,
    pdf blob null,
    CONSTRAINT fk_idUsuario2 FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
    ON DELETE CASCADE ON UPDATE CASCADE
);
-- Create the table Idioma
CREATE TABLE idioma(
    idIdioma int unsigned not null auto_increment primary key,
    titulo varchar(200) not null,
    certificacionOficial varchar(50) null,
    nivelOral smallint  not null,
    nivelEscrito smallint not null,
    nivelEscucha smallint not null
);
-- Create the table Curriculum_idioma
CREATE TABLE curriculum_idioma(
    idCurriculum int unsigned not null,
    idIdioma int unsigned not null,
    CONSTRAINT pk_curriculum_idioma PRIMARY KEY (idCurriculum,idIdioma),
    CONSTRAINT fk_idCurriculum FOREIGN KEY (idCurriculum) REFERENCES curriculum(idCurriculum) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_idIdioma FOREIGN KEY (idIdioma) REFERENCES idioma(idIdioma) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Create the table Formacion_complementaria
CREATE TABLE formacion_complementaria(
    idFormacionComplementaria int unsigned not null auto_increment primary key,
    titulo varchar(200) not null,
    profesor varchar(200) not null,
    fechaFin date not null
);
-- Create the table Curriculum_formacioncomplementaria
CREATE TABLE curriculum_formacioncomplementaria(
    idCurriculum int unsigned not null,
    idFormacionComplementaria int unsigned not null,
    CONSTRAINT pk_curriculum_formacioncomplementaria PRIMARY KEY (idCurriculum,idFormacionComplementaria),
    CONSTRAINT fk_idCurriculum2 FOREIGN KEY (idCurriculum) REFERENCES curriculum(idCurriculum) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_idFormacionComplementaria FOREIGN KEY (idFormacionComplementaria) REFERENCES formacion_complementaria(idFormacionComplementaria) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Create the table ExperienciaLaboral
CREATE TABLE experienciaLaboral(
    idExperienciaLaboral int unsigned auto_increment not null primary key,
    idCurriculum int unsigned not null,
    experienciaLaboral varchar(500) not null,
    fechaInicio date not null,
    fechaFin date not null,
    CONSTRAINT fk_idCurriculum3 FOREIGN KEY (idCurriculum) REFERENCES curriculum(idCurriculum)
    ON DELETE CASCADE ON UPDATE CASCADE
);
-- Create the table Estudios
CREATE TABLE estudios(
    idEstudios int unsigned auto_increment not null primary key,
    idCurriculum int unsigned not null,
    estudios varchar(500) not null,
    fecha date not null,
    CONSTRAINT fk_idCurriculum4 FOREIGN KEY (idCurriculum) REFERENCES curriculum(idCurriculum)
    ON DELETE CASCADE ON UPDATE CASCADE
);
-- Create the table Empresas
CREATE TABLE empresas(
    idEmpresa int unsigned auto_increment not null primary key,
    nombreEmpresa varchar(200) not null unique,
    telefono char(15) not null,
    password varchar(255) not null,
    correoEmpresa varchar(255) not null,
    nombreContacto varchar(100) null,
    apellidoContacto varchar(100) null,
    nif char(9) null
);
-- Create the table Empresa de Empleo
CREATE TABLE eEmpleo(
    idEmpresa int unsigned not null primary key,
    CONSTRAINT fk_idEmpresa FOREIGN KEY (idEmpresa) REFERENCES empresas(idEmpresa) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Create the table Empresa de FCT
CREATE TABLE eFct(
    idEmpresa int unsigned not null primary key,
    numeroConvenio smallint not null,
    CONSTRAINT fk_idEmpresa2 FOREIGN KEY (idEmpresa) REFERENCES empresas(idEmpresa) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Create the table Ofertas
CREATE TABLE ofertas(
    idOferta int unsigned not null primary key,
    idEmpresa int unsigned not null,
    localizacion varchar(100) null,
    tituloOferta varchar(255) not null,
    mensaje varchar(500) not null,
    salario int null,
    contrato varchar(100) null,
    jornada varchar(100) not null,
    pdf blob null,
    urlOferta varchar(255) null,
    fechaHoraPublicacion datetime not null,
    duracionContrato varchar(100) null,
    fechaExpiracion datetime not null,
    nombreContacto varchar(200) null,
    telefonoContacto char(15) null,
    correoContacto varchar(255) null,
    CONSTRAINT fk_idEmpresa3 FOREIGN KEY (idEmpresa) REFERENCES empresas(idEmpresa)
);
-- Create the table Ofertas_FamiliasProfesionales
CREATE TABLE ofertas_familiasProfesionales(
    idOferta int unsigned not null,
    idFamilia tinyint unsigned not null,
    CONSTRAINT pk_ofertas_familiasProfesionales PRIMARY KEY (idOferta,idFamilia),
    CONSTRAINT fk_idOferta FOREIGN KEY (idOferta) REFERENCES ofertas(idOferta),
    CONSTRAINT fk_idFamilia2 FOREIGN KEY (idFamilia) REFERENCES familiasProfesionales(idFamilia)
);
-- Create the table Usuarios_Ofertas
CREATE TABLE usuarios_ofertas(
    idOferta int unsigned not null,
    idUsuario int unsigned not null,
    CONSTRAINT pk_usuarios_ofertas PRIMARY KEY (idOferta, idUsuario),
    CONSTRAINT fk_idOferta2 FOREIGN KEY (idOferta) REFERENCES ofertas(idOferta),
    CONSTRAINT fk_idUsuario3 FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);