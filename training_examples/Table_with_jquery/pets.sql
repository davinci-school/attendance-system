-- --------------------------------------------------------
-- Hostitel:                     127.0.0.1
-- Verze serveru:                10.4.8-MariaDB - mariadb.org binary distribution
-- OS serveru:                   Win64
-- HeidiSQL Verze:               10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Exportování struktury databáze pro
CREATE DATABASE IF NOT EXISTS `pets` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `pets`;

-- Exportování struktury pro tabulka pets.users_to_pets
CREATE TABLE IF NOT EXISTS `users_to_pets` (
  `name` text DEFAULT NULL,
  `job` text DEFAULT NULL,
  `pet` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportování dat pro tabulku pets.users_to_pets: ~0 rows (přibližně)
/*!40000 ALTER TABLE `users_to_pets` DISABLE KEYS */;
INSERT INTO `users_to_pets` (`name`, `job`, `pet`) VALUES
	('Philip', 'professor', 'cat.jpg'),
	('John', 'student', 'dog.jpg'),
	('Carol', 'engineer', 'bear.jpg');
/*!40000 ALTER TABLE `users_to_pets` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
