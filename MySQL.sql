-- Adminer 4.3.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `tinycms` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `tinycms`;

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `activite` varchar(100) DEFAULT NULL,
  `addr` text,
  `email` varchar(100) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `type` varchar(1) DEFAULT NULL,
  `tag` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `contrats_et` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `int_prj` varchar(256) NOT NULL COMMENT 'nature de cahier des charge',
  `dir` varchar(100) DEFAULT NULL COMMENT 'directeur',
  `pole` varchar(4) DEFAULT NULL COMMENT 'pole',
  `nat_op` varchar(20) DEFAULT NULL COMMENT 'nature de loperation',
  `obj_op` varchar(256) DEFAULT NULL COMMENT 'objet de loperation',
  `md_pass` varchar(256) DEFAULT NULL COMMENT 'mode de passation',
  `date_exet` date DEFAULT NULL COMMENT 'date dexecution des etudes',
  `mnt_con` int(11) DEFAULT NULL COMMENT 'montant contractuel HT',
  `n_c` varchar(100) DEFAULT NULL COMMENT 'n contrat',
  `cocont` varchar(256) DEFAULT NULL COMMENT 'cocontractant',
  `date_ods` date DEFAULT NULL COMMENT 'date ODS debut de travaux',
  `date_pdd` date DEFAULT NULL COMMENT 'date prorogation des delais',
  `date_rp` date DEFAULT NULL COMMENT 'date reception provisoire',
  `date_rd` date DEFAULT NULL COMMENT 'date reception definitive',
  `mnt_av` int(11) DEFAULT NULL COMMENT 'montant des avenants',
  `mnt_paie` int(11) DEFAULT NULL COMMENT 'montant des paiement',
  `cont` varchar(256) DEFAULT NULL COMMENT 'contentieux',
  `obs` text COMMENT 'observation',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `contrats_pr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL COMMENT 'type de cahier des charge',
  `nature` varchar(20) NOT NULL COMMENT 'nature de cahier des charge',
  `n_cdc` varchar(50) DEFAULT NULL COMMENT 'n cahier des charge',
  `i_cdc` varchar(512) DEFAULT NULL COMMENT 'intitule du cahier des charge',
  `pole` varchar(100) DEFAULT NULL COMMENT 'pole',
  `dir` varchar(100) DEFAULT NULL COMMENT 'directeur',
  `date_evg` date DEFAULT NULL COMMENT 'date envoi pour validation',
  `date_vg` date DEFAULT NULL COMMENT 'date validation groupe',
  `date_l` date DEFAULT NULL COMMENT 'date lancement',
  `date_o` date DEFAULT NULL COMMENT 'date ouverture',
  `date_a` date DEFAULT NULL COMMENT 'date analyse',
  `frs` varchar(256) DEFAULT NULL COMMENT 'fournisseur retenu',
  `mnt` varchar(100) DEFAULT NULL COMMENT 'montant HT',
  `date_ap` date DEFAULT NULL COMMENT 'date attribution provisoire',
  `date_ev` date DEFAULT NULL COMMENT 'date envoi pour validation',
  `date_v` date DEFAULT NULL COMMENT 'date validation',
  `n_c` varchar(50) DEFAULT NULL COMMENT 'n contrat',
  `date_c` date DEFAULT NULL COMMENT 'date contrat',
  `et_c` varchar(20) DEFAULT NULL COMMENT 'etat contrat',
  `date_lv` date DEFAULT NULL COMMENT 'date previsionnelle de livraison',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `contrats_st` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL COMMENT 'type de contrats de sous traitance BT/GC',
  `int_prj` varchar(256) NOT NULL COMMENT 'nature de cahier des charge',
  `dir` varchar(100) DEFAULT NULL COMMENT 'directeur',
  `pole` varchar(100) DEFAULT NULL COMMENT 'pole',
  `nat_op` varchar(20) DEFAULT NULL COMMENT 'nature de loperation',
  `obj_op` text COMMENT 'objet de loperation',
  `md_pass` text COMMENT 'mode de passation',
  `date_af` date DEFAULT NULL COMMENT 'date lancement de lappel doffre',
  `date_ovp` date DEFAULT NULL COMMENT 'date overture des plis',
  `date_eof` date DEFAULT NULL COMMENT 'date devaluation des offres',
  `d_rl` varchar(20) DEFAULT NULL COMMENT 'delai de realisation',
  `mnt` varchar(100) DEFAULT NULL COMMENT 'montant contractuel TTC',
  `n_c` varchar(100) DEFAULT NULL COMMENT 'n contrat',
  `cocont` varchar(256) DEFAULT NULL COMMENT 'cocontractant',
  `adr` varchar(256) DEFAULT NULL COMMENT 'addresse',
  `n_nif` varchar(256) DEFAULT NULL COMMENT 'n NIF',
  `n_art` varchar(256) DEFAULT NULL COMMENT 'n Article dimposition',
  `date_enr` date DEFAULT NULL COMMENT 'date denregistrement',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `form` (
  `N_form` int(10) NOT NULL AUTO_INCREMENT,
  `iD_user` int(10) NOT NULL,
  `iD_form` varchar(20) CHARACTER SET cp1250 NOT NULL,
  `Date` datetime NOT NULL,
  `Status` varchar(10) CHARACTER SET cp1250 DEFAULT NULL,
  `Note` text CHARACTER SET cp1250,
  `d_insert` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`N_form`),
  UNIQUE KEY `iD_form` (`N_form`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `form_data` (
  `N_form` int(20) NOT NULL,
  `Field` varchar(20) CHARACTER SET cp1250 NOT NULL,
  `Value` longtext CHARACTER SET cp1250
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `form_type` (
  `code` varchar(20) CHARACTER SET cp1250 NOT NULL,
  `name` varchar(100) CHARACTER SET cp1250 NOT NULL,
  `access` varchar(10) CHARACTER SET cp1250 NOT NULL DEFAULT '0',
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `produits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref` int(11) NOT NULL,
  `designation` tinytext NOT NULL,
  `fournisseur` int(11) DEFAULT NULL,
  `stock` int(10) unsigned zerofill NOT NULL,
  `stk_min` int(10) unsigned zerofill NOT NULL,
  `stk_max` int(10) unsigned zerofill NOT NULL,
  `u` int(11) DEFAULT NULL,
  `fam` int(11) DEFAULT NULL,
  `s_fam` int(11) DEFAULT NULL,
  `prx_achat` int(10) unsigned zerofill NOT NULL,
  `prx_vente` int(10) unsigned zerofill NOT NULL,
  `date_fabrication` date DEFAULT NULL,
  `date_peremption` date DEFAULT NULL,
  `date_fin_garantie` date DEFAULT NULL,
  `depot` varchar(250) DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(128) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `address` text,
  `tel` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `sex` varchar(1) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `directeur` varchar(100) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `signature` text,
  `policy` text,
  `act` text,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `_log` (
  `iD` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(256) NOT NULL,
  `user` varchar(256) NOT NULL,
  `msg` text NOT NULL,
  `dt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`iD`),
  UNIQUE KEY `iD` (`iD`),
  KEY `user` (`user`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


-- 2017-09-13 08:31:31