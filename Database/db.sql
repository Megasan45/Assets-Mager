--Crear y usar bases de datos--

create database Assets_Mager_DB;

use Assets_Mager_DB;

--Tabla de los usuarios--

create table Users(
    ID int(11) Not null,
    email varchar(45) not null,
    fullname varchar(70) not null,
    password varchar(85) not null
);

alter table Users 
    add primary key (ID);

alter table Users
    modify ID int(11) Not null AUTO_INCREMENT, AUTO_INCREMENT = 2;

describe Users;

--Tabla de los bienes--
create table Assets (
    ID int(11) not null,
    arrendatario varchar(70) not null,
    operacion varchar(25) not null,
    municipio varchar(50) not null,
    barrio varchar(50) not null,
    direccion varchar(150) not null,
    estrato int(1) not null,
    fecha_pago date not null,
    valor int(12) not null,
    valor_danos int(12) not null,
    valor_admin int(12) not null,
    subida_en timestamp not null default current_timestamp,
    alcobas int(9) not null,
    banios int(9) not null,
    garage varchar(2) not null,
    piscina varchar(2) not null,
    cuarto_util varchar(2) not null,
    unidad varchar(12) not null,
    porteria24h varchar(2) not null,
    vivienda varchar(12) not null,
    familia varchar(12) not null,
    servicios varchar(2) not null,
    gas varchar(2) not null,
    piso int(3),
    ascensor varchar(2),
    juegos varchar(2),
    areas_comunes varchar(2),
    area float(5),
    antiguedad int(4),
    constructora varchar(45),
    predial int(12),
    descripcion text,
    user_id int(11),
    constraint fk_user foreign key (user_id) references Users(ID)
);

Alter table Assets
    add primary key (ID);

Alter table Assets
    Modify ID int(11) not null AUTO_INCREMENT, AUTO_INCREMENT = 2;

describe Assets;