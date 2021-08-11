-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bt7sowtz4mfyhvfqzo09-mysql.services.clever-cloud.com:3306
-- Generation Time: Jul 27, 2021 at 01:53 AM
-- Server version: 8.0.22-13
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Assets Mager`
--

-- --------------------------------------------------------

--
-- Table structure for table `Assets`
--

CREATE TABLE `Assets` (
  `ID` int NOT NULL,
  `arrendatario` varchar(70) NOT NULL,
  `operacion` varchar(25) NOT NULL,
  `municipio` varchar(50) NOT NULL,
  `barrio` varchar(50) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `estrato` int NOT NULL,
  `fecha_pago` varchar(20) NOT NULL,
  `valor` int NOT NULL,
  `valor_danos` int NOT NULL,
  `valor_admin` int NOT NULL,
  `subida_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `alcobas` int NOT NULL,
  `banios` int NOT NULL,
  `garage` varchar(2) NOT NULL,
  `piscina` varchar(2) NOT NULL,
  `cuarto_util` varchar(2) NOT NULL,
  `unidad` varchar(12) NOT NULL,
  `porteria24h` varchar(2) NOT NULL,
  `vivienda` varchar(12) NOT NULL,
  `familia` varchar(12) NOT NULL,
  `servicios` varchar(2) NOT NULL,
  `gas` varchar(2) NOT NULL,
  `piso` int DEFAULT NULL,
  `ascensor` varchar(2) DEFAULT NULL,
  `juegos` varchar(2) DEFAULT NULL,
  `areas_comunes` varchar(2) DEFAULT NULL,
  `area` float DEFAULT NULL,
  `antiguedad` int DEFAULT NULL,
  `constructora` varchar(45) DEFAULT NULL,
  `predial` int DEFAULT NULL,
  `descripcion` text,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `ID` int NOT NULL,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fullname` varchar(70) NOT NULL,
  `password` varchar(85) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for table `Assets`
--
ALTER TABLE `Assets`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Assets`
--
ALTER TABLE `Assets`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Assets`
--
ALTER TABLE `Assets`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `Users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
