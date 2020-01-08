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
CREATE DATABASE IF NOT EXISTS `attendance_system` /*!40100 DEFAULT CHARACTER SET latin2 COLLATE latin2_czech_cs */;
USE `attendance_system`;

-- Exportování struktury pro tabulka attendance_system.time_board
CREATE TABLE IF NOT EXISTS `time_board` (
  `ID_time_board` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ID_users` int(11) DEFAULT NULL,
  `arrived` time DEFAULT NULL,
  `leave` time DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`ID_time_board`),
  KEY `ID` (`ID_time_board`),
  KEY `ID_user` (`ID_users`),
  KEY `date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;

-- Exportování dat pro tabulku attendance_system.time_board: ~4 rows (přibližně)
/*!40000 ALTER TABLE `time_board` DISABLE KEYS */;
INSERT INTO `time_board` (`ID_time_board`, `ID_users`, `arrived`, `leave`, `date`) VALUES
	(1, 1, '09:37:38', '13:37:40', '2019-09-29'),
	(2, 2, '10:37:58', '11:37:59', '2019-09-29'),
	(3, 3, '07:38:14', '09:38:17', '2019-09-29'),
	(4, 1, '12:34:06', '14:34:11', '2019-09-30');
/*!40000 ALTER TABLE `time_board` ENABLE KEYS */;

-- Exportování struktury pro tabulka attendance_system.users
CREATE TABLE IF NOT EXISTS `users` (
  `ID_users` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE latin2_czech_cs NOT NULL DEFAULT '0',
  `password` varchar(50) COLLATE latin2_czech_cs DEFAULT NULL,
  PRIMARY KEY (`ID_users`),
  KEY `ID_user_name` (`ID_users`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin2 COLLATE=latin2_czech_cs;

-- Exportování dat pro tabulku attendance_system.users: ~3 rows (přibližně)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`ID_users`, `username`, `password`) VALUES
	(1, 'jtrojanova', 'ahojjaksemas'),
	(2, 'Ondřej Schicker', 'admin4321'),
	(3, 'Filip Zajíc', 'admin1234');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
