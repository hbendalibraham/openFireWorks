-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `agence`;
CREATE TABLE `agence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_agence` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `contrats`;
CREATE TABLE `contrats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contrats` varchar(100) NOT NULL,
  `n_dossier` varchar(100) DEFAULT NULL,
  `n_police` varchar(100) DEFAULT NULL,
  `id_assurance` int(11) DEFAULT NULL,
  `id_pole` int(11) DEFAULT NULL,
  `id_nt` int(11) DEFAULT NULL,
  `id_directeur` int(11) DEFAULT NULL,
  `date_effet` date DEFAULT NULL,
  `date_ech` date DEFAULT NULL,
  `mnt_prime` date DEFAULT NULL,
  `odp` date DEFAULT NULL,
  `travaux` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `av_augmentation_cap` varchar(100) DEFAULT NULL,
  `av_prorogation_delai` varchar(100) DEFAULT NULL,
  `av_augmentation_prorogation` varchar(100) DEFAULT NULL,
  `obs` text,
  PRIMARY KEY (`id`),
  KEY `id_nt` (`id_nt`),
  KEY `id_directeur` (`id_directeur`),
  CONSTRAINT `contrats_ibfk_1` FOREIGN KEY (`id_nt`) REFERENCES `nt` (`id`),
  CONSTRAINT `contrats_ibfk_2` FOREIGN KEY (`id_directeur`) REFERENCES `nt` (`id`)
);


DROP TABLE IF EXISTS `nt`;
CREATE TABLE `nt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_nt` varchar(5) NOT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `montant` float DEFAULT NULL,
  `id_pole` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `pole`;
CREATE TABLE `pole` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_pole` varchar(5) NOT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `directeur` int(11) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `montant` float DEFAULT NULL,
  `date_demarage` date DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task` text NOT NULL,
  `prio` int(10) unsigned zerofill NOT NULL,
  `date_ins` timestamp NULL DEFAULT NULL,
  `cron` datetime DEFAULT NULL,
  `done` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(128) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `firstname` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `lastname` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `address` text CHARACTER SET utf8,
  `lat` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT 'Latitude',
  `long` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT 'Longitude',
  `mobile` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `tel` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `fax` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `sex` varchar(1) CHARACTER SET utf8 DEFAULT NULL,
  `department` text CHARACTER SET utf8,
  `dir` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT 'directeur',
  `code` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `signature` text CHARACTER SET utf8 COMMENT 'signature',
  `date_insert` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_login` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `policy` text CHARACTER SET utf8 COMMENT 'access rule',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
);

INSERT INTO `user` (`id`, `username`, `password`, `email`, `firstname`, `lastname`, `address`, `lat`, `long`, `mobile`, `tel`, `fax`, `sex`, `department`, `dir`, `code`, `signature`, `date_insert`, `date_login`, `policy`) VALUES
(1, 'hbendali', 'genesis', 'hbendali@yandex.com',  'Hamza',  'BENDALI BRAHAM', 'Quartier Rekia Mustapha MEDEA 26800',  NULL, NULL, '+213552830677',  ' ',  NULL, 'm',  'DCGSI',  NULL, '1504', NULL, '2016-12-11 12:24:26',  '2017-08-02 08:52:24',  '{lock: false, level: \"1\", beta: true}');
