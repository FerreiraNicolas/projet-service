-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 08 juil. 2023 à 22:07
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet`
--

-- --------------------------------------------------------

--
-- Structure de la table `book`
--

DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author_id` int NOT NULL,
  `category_id` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `book`
--

INSERT INTO `book` (`title`, `author_id`, `category_id`) VALUES
('Harry Potter and the Sorcerer s Stone', 1, 1),
('The Shining', 2, 2),  
('The Hunger Games', 3, 3),
('To Kill a Mockingbird', 4, 4),
('A Game of Thrones', 5, 5),
('The Lord of the Rings', 6, 1), 
('The Great Gatsby', 7, 3),
('Pride and Prejudice', 8, 4),
('The Old Man and the Sea', 9, 5),
('Of Mice and Men', 10, 2),
('Slaughterhouse-Five', 11, 2),
('The Handmaid s Tale', 12, 3),
('Fahrenheit 451', 13, 2),
('Brave New World', 14, 3),
('1984', 15, 2),
('Fight Club', 16, 2),
('American Gods', 17, 1),
('Good Omens', 18, 1),
('The Hitchhiker s Guide to the Galaxy', 19, 1),
('The Fault in Our Stars', 20, 3),
('The Bell Jar', 21, 4),
('The Picture of Dorian Gray', 22, 4), 
('Fear and Loathing in Las Vegas', 23, 2),
('Frankenstein', 24, 1),
('The Raven', 25, 5);


--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
