-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 12, 2025 at 01:50 AM
-- Server version: 8.0.18
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cweeterie`
--
DROP DATABASE IF EXISTS `cweeterie`;
CREATE DATABASE `cweeterie` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cweeterie`;
-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collection_idees`
--

CREATE TABLE `collection_idees` (
  `collection_id` int(11) NOT NULL,
  `idee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` int(11) NOT NULL,
  `idee_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `idees`
--

CREATE TABLE `idees` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL, 
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `bio` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_collections_users` (`user_id`);

--
-- Indexes for table `collection_idees`
--
ALTER TABLE `collection_idees`
  ADD PRIMARY KEY (`collection_id`,`idee_id`),
  ADD KEY `fk_collection_idees` (`idee_id`);

--
-- Indexes for table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idee_id` (`idee_id`),
  ADD KEY `fk_commentaire_user` (`user_id`);

--
-- Indexes for table `idees`
--
ALTER TABLE `idees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `idees`
--
ALTER TABLE `idees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `idees` DROP INDEX `user`;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `fk_collections_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `collection_idees`
--
ALTER TABLE `collection_idees`
  ADD CONSTRAINT `fk_collection_idees` FOREIGN KEY (`idee_id`) REFERENCES `idees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_collection_idees_collections` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `fk_commentaire_idee` FOREIGN KEY (`idee_id`) REFERENCES `idees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_commentaire_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `idees`
--
ALTER TABLE `idees`
  ADD CONSTRAINT `fk_idees_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

INSERT INTO users (username, password, bio) 
VALUES ('Sean', 'password123', 'My bio');


INSERT INTO idees (user_id, titre, description, photo, date) VALUES
(1, 'blueberrymuffins', 'Description for blueberrymuffins', '/pins/blueberrymuffins.jpg', CURDATE()),
(1, 'breadsweet', 'Description for breadsweet', '/pins/breadsweet.jpg', CURDATE()),
(1, 'brownies', 'Description for brownies', '/pins/brownies.jpg', CURDATE()),
(1, 'buns', 'Description for buns', '/pins/buns.jpg', CURDATE()),
(1, 'chocolatecoookie', 'Description for chocolatecoookie', '/pins/chocolatecoookie.jpg', CURDATE()),
(1, 'coffeeMacaron', 'Description for coffeeMacaron', '/pins/coffeeMacaron.jpg', CURDATE()),
(1, 'dantart', 'Description for dantart', '/pins/dantart.jpg', CURDATE()),
(1, 'eggsandwich', 'Description for eggsandwich', '/pins/eggsandwich.jpg', CURDATE()),
(1, 'firstcookies', 'Description for firstcookies', '/pins/firstcookies.jpg', CURDATE()),
(1, 'japanese curry', 'Description for japanese curry', '/pins/japanese curry.jpg', CURDATE()),
(1, 'lemonMadeleine', 'Description for lemonMadeleine', '/pins/lemonMadeleine.jpg', CURDATE()),
(1, 'Macaron', 'Description for Macaron', '/pins/Macaron.jpg', CURDATE()),
(1, 'Maple-Pecan-Bread-Pudding-3-1067x1600', 'Description for Maple-Pecan-Bread-Pudding', '/pins/Maple-Pecan-Bread-Pudding-3-1067x1600.jpg', CURDATE()),
(1, 'more cinnamonrolls!', 'Description for more cinnamonrolls!', '/pins/more cinnamonrolls!.jpg', CURDATE()),
(1, 'morepasta', 'Description for morepasta', '/pins/morepasta.jpg', CURDATE()),
(1, 'Mousse', 'Description for Mousse', '/pins/Mousse.jpg', CURDATE()),
(1, 'onepot', 'Description for onepot', '/pins/onepot.jpg', CURDATE()),
(1, 'Palmier', 'Description for Palmier', '/pins/Palmier.jpg', CURDATE()),
(1, 'pasta', 'Description for pasta', '/pins/pasta.jpg', CURDATE()),
(1, 'pinkMaccaron', 'Description for pinkMaccaron', '/pins/pinkMaccaron.jpg', CURDATE()),
(1, 'pudding', 'Description for pudding', '/pins/pudding.jpg', CURDATE()),
(1, 'rouleauCannelle', 'Description for rouleauCannelle', '/pins/rouleauCannelle.jpg', CURDATE()),
(1, 'sandwiches', 'Description for sandwiches', '/pins/sandwiches.jpg', CURDATE()),
(1, 'supreme croisant', 'Description for supreme croisant', '/pins/supreme croisant.jpg', CURDATE()),
(1, 'tartpastries', 'Description for tartpastries', '/pins/tartpastries.jpg', CURDATE()),
(1, 'tiramisu', 'Description for tiramisu', '/pins/tiramisu.jpg', CURDATE()),
(1, 'tiramisuCup', 'Description for tiramisuCup', '/pins/tiramisuCup.jpg', CURDATE()),
(1, 'tonkatsu', 'Description for tonkatsu', '/pins/tonkatsu.jpg', CURDATE());
