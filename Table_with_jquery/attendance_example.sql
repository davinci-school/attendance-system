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

-- Exportování dat pro tabulku attendance_system.time_board: ~4 rows (přibližně)
/*!40000 ALTER TABLE `time_board` DISABLE KEYS */;
INSERT INTO `time_board` (`ID_time_board`, `ID_users`, `arrived`, `leave`, `date`) VALUES
	(1, 1, '09:37:38', '13:37:40', '2019-09-29'),
	(2, 2, '10:37:58', '11:37:59', '2019-09-29'),
	(3, 3, '07:38:14', '09:38:17', '2019-09-29'),
	(4, 1, '12:34:06', '14:34:11', '2019-09-30');
/*!40000 ALTER TABLE `time_board` ENABLE KEYS */;

-- Exportování dat pro tabulku attendance_system.users: ~2 rows (přibližně)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`ID_users`, `name`, `password`) VALUES
	(1, 'Jana Trojanová', NULL),
	(2, 'Ondřej Schicker', NULL),
	(3, 'Filip Zajíc', NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
