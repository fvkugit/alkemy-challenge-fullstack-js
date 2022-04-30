CREATE DATABASE budget_manager;
USE budget_manager;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `movements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` float DEFAULT NULL,
  `desc` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `isIncome` tinyint DEFAULT '0',
  `categoryId` int DEFAULT '8',
  PRIMARY KEY (`id`),
  KEY `categoria_idx` (`categoryId`),
  CONSTRAINT `budgetCategory` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categories` VALUES(1, 'Personal Spending'),(2, 'Food'),(3, 'Housing'),(4, 'Transportation'),(5, 'Utilities'),(6, 'Services'),(7, 'Savings'),(8, 'Misc.'),(9, 'Medical');