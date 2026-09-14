-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: aquahomedb
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aquahomeapp_category`
--

DROP TABLE IF EXISTS `aquahomeapp_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aquahomeapp_category_name_d2632388_uniq` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_category`
--

LOCK TABLES `aquahomeapp_category` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_category` DISABLE KEYS */;
INSERT INTO `aquahomeapp_category` VALUES (1,'2026-08-18 12:01:41.750355','2026-08-18 12:01:41.750389','Cá','Các loài cá cảnh nước ngọt.'),(2,'2026-08-18 12:01:41.754337','2026-08-18 12:01:41.754358','Bể cá','Bể kính, hồ thủy sinh và bộ set-up đi kèm.'),(3,'2026-08-18 12:01:41.757804','2026-08-18 12:01:41.757826','Thức ăn','Thức ăn cho cá cảnh.'),(4,'2026-08-18 12:01:41.761962','2026-08-18 12:01:41.761985','Phụ kiện','Máy lọc, máy sưởi, đèn, máy sục khí và phụ kiện khác.'),(5,'2026-08-18 12:01:41.765276','2026-08-18 12:01:41.765298','Cây thủy sinh','Cây trồng trong bể, hỗ trợ môi trường sống tự nhiên cho cá.');
/*!40000 ALTER TABLE `aquahomeapp_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aquahomeapp_feature`
--

DROP TABLE IF EXISTS `aquahomeapp_feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_feature` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_feature`
--

LOCK TABLES `aquahomeapp_feature` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_feature` DISABLE KEYS */;
INSERT INTO `aquahomeapp_feature` VALUES (1,'2026-08-18 11:58:05.363419','2026-08-18 11:58:05.363464','Ôn hòa','Tính cách hiền, ít gây hấn với cá khác, phù hợp bể cộng đồng'),(2,'2026-08-18 11:58:05.370667','2026-08-18 11:58:05.370701','Bán hung dữ','Có thể gây hấn trong một số điều kiện (thiếu không gian, sinh sản, ít cá thể) nhưng không liên tục'),(3,'2026-08-18 11:58:05.384882','2026-08-18 11:58:05.384915','Hung dữ','Thường xuyên gây hấn, tấn công cá khác, cần cân nhắc kỹ khi ghép bể'),(4,'2026-08-18 11:58:05.398278','2026-08-18 11:58:05.398317','Cắn vây','Có xu hướng cắn/rỉa vây cá khác, đặc biệt cá vây dài'),(5,'2026-08-18 11:58:05.404410','2026-08-18 11:58:05.404444','Vây dài','Bản thân loài có vây dài, dễ bị các loài cắn vây nhắm tới hoặc bị hiểu lầm là đối thủ'),(6,'2026-08-18 11:58:05.417251','2026-08-18 11:58:05.417285','Có tính lãnh thổ','Bảo vệ khu vực sống/sinh sản, dễ xung đột với cá cùng loài hoặc hình dáng tương tự'),(7,'2026-08-18 11:58:05.423562','2026-08-18 11:58:05.423610','Sống theo đàn','Cần nuôi theo nhóm (số lượng tối thiểu) để giảm stress/gây hấn và thể hiện tập tính tự nhiên'),(8,'2026-08-18 11:58:05.435201','2026-08-18 11:58:05.435239','Nuôi đơn độc','Khuyến nghị nuôi riêng một mình, không ghép chung bể cộng đồng'),(9,'2026-08-18 11:58:05.445642','2026-08-18 11:58:05.445691','Tầng mặt','Chủ yếu hoạt động ở tầng nước trên'),(10,'2026-08-18 11:58:05.453669','2026-08-18 11:58:05.453702','Tầng giữa','Chủ yếu hoạt động ở tầng nước giữa'),(11,'2026-08-18 11:58:05.466473','2026-08-18 11:58:05.466506','Tầng đáy','Chủ yếu hoạt động ở tầng đáy bể'),(12,'2026-08-18 11:58:05.471684','2026-08-18 11:58:05.471713','Phá cây thủy sinh','Có xu hướng đào bới nền hoặc làm hỏng cây thủy sinh');
/*!40000 ALTER TABLE `aquahomeapp_feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aquahomeapp_order`
--

DROP TABLE IF EXISTS `aquahomeapp_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_phone` varchar(11) NOT NULL,
  `customer_address` varchar(500) NOT NULL,
  `status` varchar(20) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `notes` longtext,
  `customer_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aquahomeapp_order_customer_id_e2997c97_fk_aquahomeapp_user_id` (`customer_id`),
  CONSTRAINT `aquahomeapp_order_customer_id_e2997c97_fk_aquahomeapp_user_id` FOREIGN KEY (`customer_id`) REFERENCES `aquahomeapp_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_order`
--

LOCK TABLES `aquahomeapp_order` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_order` DISABLE KEYS */;
INSERT INTO `aquahomeapp_order` VALUES (1,'2026-08-30 12:32:25.203695','2026-08-30 13:00:57.742526','Minh Thư','0977888999','TP HCM','DELIVERED',58000.00,'',3),(2,'2026-08-30 12:35:26.716756','2026-09-08 06:15:56.492011','Minh Thư','0977888999','TP HCM','DELIVERED',58000.00,'',3),(3,'2026-08-30 12:59:56.682966','2026-08-30 13:01:17.218127','Minh Thư','0977888999','aaaaa','PROCESSING',35000.00,'à',3),(4,'2026-08-31 06:17:05.801917','2026-08-31 06:20:21.770140','Minh Thư','0977888999','TP HCM','PROCESSING',15000.00,'',3),(5,'2026-09-08 04:37:28.369180','2026-09-08 04:37:28.369218','Minh Thư','0977888999','HCM','PENDING',15000.00,'',3),(6,'2026-09-08 05:57:20.596580','2026-09-08 06:09:52.783438','Minh Thư','0977888999','Nhà Bè, TP.HCM','PROCESSING',80000.00,'',3);
/*!40000 ALTER TABLE `aquahomeapp_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aquahomeapp_orderitem`
--

DROP TABLE IF EXISTS `aquahomeapp_orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_orderitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aquahomeapp_orderitem_order_id_d4b414c7_fk_aquahomeapp_order_id` (`order_id`),
  KEY `aquahomeapp_orderite_product_id_71df254b_fk_aquahomea` (`product_id`),
  CONSTRAINT `aquahomeapp_orderite_product_id_71df254b_fk_aquahomea` FOREIGN KEY (`product_id`) REFERENCES `aquahomeapp_product` (`id`),
  CONSTRAINT `aquahomeapp_orderitem_order_id_d4b414c7_fk_aquahomeapp_order_id` FOREIGN KEY (`order_id`) REFERENCES `aquahomeapp_order` (`id`),
  CONSTRAINT `aquahomeapp_orderitem_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_orderitem`
--

LOCK TABLES `aquahomeapp_orderitem` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_orderitem` DISABLE KEYS */;
INSERT INTO `aquahomeapp_orderitem` VALUES (1,2,25000.00,1,2),(2,1,8000.00,1,6),(3,2,25000.00,2,2),(4,1,8000.00,2,6),(5,1,35000.00,3,3),(6,1,15000.00,4,1),(7,1,15000.00,5,1),(8,1,35000.00,6,3),(9,1,25000.00,6,2),(10,1,20000.00,6,4);
/*!40000 ALTER TABLE `aquahomeapp_orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aquahomeapp_product`
--

DROP TABLE IF EXISTS `aquahomeapp_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` longtext NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `category_id` bigint NOT NULL,
  `species_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aquahomeapp_product_category_id_d0ca3c67_fk_aquahomea` (`category_id`),
  KEY `aquahomeapp_product_species_id_425a4670_fk_aquahomea` (`species_id`),
  CONSTRAINT `aquahomeapp_product_category_id_d0ca3c67_fk_aquahomea` FOREIGN KEY (`category_id`) REFERENCES `aquahomeapp_category` (`id`),
  CONSTRAINT `aquahomeapp_product_species_id_425a4670_fk_aquahomea` FOREIGN KEY (`species_id`) REFERENCES `aquahomeapp_species` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_product`
--

LOCK TABLES `aquahomeapp_product` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_product` DISABLE KEYS */;
INSERT INTO `aquahomeapp_product` VALUES (1,'2026-08-18 12:01:41.771421','2026-09-07 08:01:39.104308','Cá Bảy Màu Koi thường',15000.00,120,'image/upload/v1788764821/jbxdkezyqpxryxmglfao.jpg','Cá bảy màu (Poecilia reticulata) dòng Koi.',1,1,1),(2,'2026-08-18 12:01:41.776020','2026-09-07 08:02:56.097912','Cá Bảy Màu Full Red',25000.00,60,'image/upload/v1788768177/nmkyqnytbpvj4ufgujer.png','Cá bảy màu (Poecilia reticulata) dòng Full Red',1,1,1),(3,'2026-08-18 12:01:41.780835','2026-09-07 08:04:58.538738','Cá Bảy Màu Dumbo Red Tail',35000.00,40,'image/upload/v1788768299/nggozua1x4mqr7tafkfm.webp','Cá bảy màu (Poecilia reticulata) có vây ngực lớn như tai voi (Dumbo)',1,1,1),(4,'2026-08-18 12:01:41.784428','2026-09-07 08:10:39.204561','Cá Molly Đen',20000.00,80,'image/upload/v1788768639/bwxzwbwflntkargqao4z.jpg','Molly (Poecilia sphenops) màu đen tuyền',1,1,8),(5,'2026-08-18 12:01:41.787997','2026-09-07 08:11:38.847895','Cá Molly Trắng',30000.00,35,'image/upload/v1788768699/zvjbnvqdhgetm2mvepyj.jpg','Molly (Poecilia sphenops) màu trắng tinh khiết',1,1,8),(6,'2026-08-18 12:01:41.791515','2026-08-18 12:01:41.791534','Cá Neon Xanh',8000.00,200,NULL,'Neon Tetra (Paracheirodon innesi), lung linh như đèn huỳnh quang',1,1,2),(7,'2026-08-18 12:01:41.795910','2026-08-18 12:01:41.795933','Cá Neon Vua',15000.00,100,NULL,'Biến thể size lớn hơn của Neon Tetra, màu sắc đậm hơn.',1,1,2),(8,'2026-08-18 12:01:41.799627','2026-08-18 12:01:41.799649','Cá Hồng Nhung',10000.00,90,NULL,'Serpae Tetra (Hyphessobrycon eques), nên nuôi đàn ≥6 con để giảm cắn vây.',1,1,11),(9,'2026-08-18 12:01:41.803224','2026-08-18 12:01:41.803246','Cá Chuột Đồng (Cory thường)',18000.00,70,NULL,'Corydoras aeneus, size 3-4cm, sống tầng đáy.',1,1,3),(10,'2026-08-18 12:01:41.806684','2026-08-18 12:01:41.806704','Cá Chuột Bạch Tạng',25000.00,40,NULL,'Corydoras aeneus dòng Albino, size 3-4cm.',1,1,3),(11,'2026-08-18 12:01:41.811140','2026-08-18 12:01:41.811187','Cá Bác Sĩ Panda Garra',50000.00,25,NULL,'Garra flavatra, cá dọn bể, hiền lành',1,1,12),(12,'2026-08-18 12:01:41.814936','2026-08-18 12:01:41.814957','Cá Dĩa Beo tuyết',28000.00,15,NULL,'Discus (Symphysodon aequifasciatus) nổi bật với các đốm trắng xen lẫn màu sắc sặc sỡ trên cơ thể, trông giống như hoa văn trên áo lông của báo tuyết.',1,1,4),(13,'2026-08-18 12:01:41.818485','2026-08-18 12:01:41.818505','Cá Dĩa Bồ Câu',25000.00,10,NULL,'Discus (Symphysodon aequifasciatus) dòng Pigeon Blood. Có bảng màu phong phú như đỏ, vàng, xanh lam.',1,1,4),(14,'2026-08-18 12:01:41.821943','2026-08-18 12:01:41.821963','Cá Thần Tiên Platinum',45000.00,50,NULL,'Angelfish (Pterophyllum scalare) sở hữu vẻ ngoài lấp lánh với làn da ánh nhũ platinum',1,1,5),(15,'2026-08-18 12:01:41.825602','2026-08-18 12:01:41.825623','Cá Thần Tiên Marble',60000.00,35,NULL,'Angelfish (Pterophyllum scalare) dòng Marble, đặc trưng bởi những vân cẩm thạch đan xen giữa ba màu đen, trắng, và vàng',1,1,5),(16,'2026-08-18 12:01:41.829951','2026-08-18 12:01:41.829972','Cá Ali Vàng',55000.00,30,NULL,'Labidochromis caeruleus dòng Yellow Princess, tính lãnh thổ',1,1,9),(17,'2026-08-18 12:01:41.833424','2026-08-18 12:01:41.833445','Cá Điện Quang',100000.00,20,NULL,'Rocio octofasciata (Jack Dempsey), màu xanh dương điện tử lộng lẫy kết hợp với những hoa văn đen. Đa số hung dữ',1,1,13),(18,'2026-08-18 12:01:41.836938','2026-08-18 12:01:41.836959','Cá Betta Vàng',50000.00,45,NULL,'Betta splendens. Nổi bật với màu vàng tươi sáng. Hung dữ, hiếu chiến',1,1,6),(19,'2026-08-18 12:01:41.840339','2026-08-18 12:01:41.840358','Cá Betta Samurai',60000.00,60,NULL,'Betta splendens. Điểm nổi bật là các sọc hoặc vằn giống như “áo giáp” của chiến binh samurai. Hiếu chiến như tên',1,1,6),(20,'2026-08-18 12:01:41.844896','2026-08-18 12:01:41.844920','Cá Betta Rồng Đỏ',80000.00,20,NULL,'Betta splendens dòng Dragon, vảy dày đỏ rực. Betta là dòng hiếu chiến',1,1,6),(21,'2026-08-18 12:01:41.848597','2026-08-18 12:01:41.848619','Cá Xecan (Tiger Barb) thường',12000.00,100,NULL,'Puntigrus tetrazona.',1,1,7),(22,'2026-08-18 12:01:41.852288','2026-08-18 12:01:41.852308','Cá Xecan Bạch Tạng',20000.00,50,NULL,'Puntigrus tetrazona dòng Albino.',1,1,7),(23,'2026-08-18 12:01:41.855853','2026-08-18 12:01:41.855875','Cá Cầu Vồng Boesemani',65000.00,30,NULL,'Melanotaenia boesemani, nên nuôi theo đàn.',1,1,10),(24,'2026-08-18 12:01:41.859507','2026-08-18 12:01:41.859530','Bể kính 40x25x30cm',250000.00,20,NULL,'Bể kính trơn, dung tích ~30L, phù hợp cá nhỏ/vừa.',1,2,NULL),(25,'2026-08-18 12:01:41.864200','2026-08-18 12:01:41.864222','Bể kính 60x35x35cm',550000.00,15,NULL,'Bể kính trơn, dung tích ~70L, phù hợp Dĩa/Cichlid.',1,2,NULL),(26,'2026-08-18 12:01:41.867882','2026-08-18 12:01:41.867903','Bể Betta mini 15L có nắp',180000.00,30,NULL,'Bể mini kèm nắp đậy, phù hợp nuôi riêng 1 Betta.',1,2,NULL),(27,'2026-08-18 12:01:41.871438','2026-08-18 12:01:41.871457','Thức ăn dạng viên tổng hợp',45000.00,100,NULL,'Viên nổi tổng hợp cho cá cảnh nước ngọt, hộp 100g.',1,3,NULL),(28,'2026-08-18 12:01:41.874837','2026-08-18 12:01:41.874859','Trùng chỉ đông lạnh',25000.00,60,NULL,'Trùn chỉ đông lạnh vỉ 100g, thức ăn tươi giàu đạm.',1,3,NULL),(29,'2026-08-18 12:01:41.879361','2026-08-18 12:01:41.879382','Thức ăn chuyên Betta',55000.00,40,NULL,'Viên thức ăn công thức riêng cho Betta, hộp 50g.',1,3,NULL),(30,'2026-08-18 12:01:41.882970','2026-08-18 12:01:41.882991','Máy lọc mini treo thành',120000.00,25,NULL,'Máy lọc treo thành bể, lưu lượng phù hợp bể 20-40L.',1,4,NULL),(31,'2026-08-18 12:01:41.886550','2026-08-18 12:01:41.886572','Máy sưởi 25W',90000.00,30,NULL,'Máy sưởi tự ngắt, phù hợp bể nhỏ dưới 40L.',1,4,NULL),(32,'2026-08-18 12:01:41.890011','2026-08-18 12:01:41.890031','Đèn LED thủy sinh 30cm',150000.00,20,NULL,'Đèn LED full-spectrum hỗ trợ cây thủy sinh và tôn màu cá.',1,4,NULL),(33,'2026-08-18 12:01:41.894384','2026-08-18 12:01:41.894424','Rong đuôi chồn',15000.00,50,NULL,'Cây thủy sinh dễ trồng, tạo nơi trú ẩn cho cá con.',1,5,NULL),(34,'2026-08-18 12:01:41.898452','2026-08-18 12:01:41.898472','Bèo Nhật',10000.00,80,NULL,'Cây nổi, giúp giảm ánh sáng và cung cấp nơi trú ẩn.',1,5,NULL);
/*!40000 ALTER TABLE `aquahomeapp_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aquahomeapp_productrecommendation`
--

DROP TABLE IF EXISTS `aquahomeapp_productrecommendation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_productrecommendation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `reason` varchar(1000) NOT NULL,
  `priority` int NOT NULL,
  `product_id` bigint NOT NULL,
  `species_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_species_product_recommendation` (`species_id`,`product_id`),
  KEY `aquahomeapp_productr_product_id_52133b6f_fk_aquahomea` (`product_id`),
  CONSTRAINT `aquahomeapp_productr_product_id_52133b6f_fk_aquahomea` FOREIGN KEY (`product_id`) REFERENCES `aquahomeapp_product` (`id`),
  CONSTRAINT `aquahomeapp_productr_species_id_fb24661d_fk_aquahomea` FOREIGN KEY (`species_id`) REFERENCES `aquahomeapp_species` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_productrecommendation`
--

LOCK TABLES `aquahomeapp_productrecommendation` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_productrecommendation` DISABLE KEYS */;
/*!40000 ALTER TABLE `aquahomeapp_productrecommendation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aquahomeapp_species`
--

DROP TABLE IF EXISTS `aquahomeapp_species`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_species` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `name_vn` varchar(100) NOT NULL,
  `scientific_name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `min_temp` double NOT NULL,
  `max_temp` double NOT NULL,
  `min_ph` double NOT NULL,
  `max_ph` double NOT NULL,
  `max_length` double NOT NULL,
  `min_tank_size` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `scientific_name` (`scientific_name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_species`
--

LOCK TABLES `aquahomeapp_species` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_species` DISABLE KEYS */;
INSERT INTO `aquahomeapp_species` VALUES (1,'2026-08-18 11:58:05.249036','2026-08-18 11:58:05.249068','Cá Bảy Màu','Poecilia reticulata','Loài rất dễ thích nghi, sống được ở hầu hết mọi môi trường từ suối vùng cao đến đầm lầy, mương nước đục. Một số quần thể còn sống được ở nước lợ. Phát triển tốt nhất trong môi trường có nhiều rêu tảo và cây thủy sinh. Rất hiền, không nên nuôi chung với loài hay cắn vây như Tiger Barb, Serpae Tetra. Hợp với bể cộng đồng yên tĩnh cùng các loài đẻ con khác, rasbora, cá chuột, tetra.',17,28,7,8.5,6,40.5),(2,'2026-08-18 11:58:05.254495','2026-08-18 11:58:05.254515','Cá Neon','Paracheirodon innesi','Loài này chủ yếu sống ở các con suối trong rừng và các nhánh sông nhỏ. Chúng nói chung rất hiền lành, là cư dân lý tưởng để nuôi chung với loài khác trong bể. Nên nuôi cùng với loài có kích cỡ tương tự hoặc nhỏ hơn, tất nhiên đừng nuôi chung với loài hung dữ. Nên mua một nhóm có cả đực lẫn cái, ít nhất 8-10 con, kết hợp với các loài cá bơi theo đàn khác để tạo môi trường phong phú, tự nhiên hơn.',21,25,4,7.5,3,54),(3,'2026-08-18 11:58:05.261651','2026-08-18 11:58:05.261702','Cá Chuột','Corydoras aeneus','Hiền lành, thích sống theo đàn. Nên nuôi tối thiểu 4-6 con.',21,27,6,8,7.5,72),(4,'2026-08-18 11:58:05.267739','2026-08-18 11:58:05.267769','Cá Dĩa','Symphysodon aequifasciatus','Thường sống ở vùng nước chảy chậm, ao rừng, tụ tập thành đàn ở khu vực có rễ cây và đá. Hiền lành, có cá thể càng cho chúng chỗ ẩn nấp chúng lại càng nhút nhát.',25,30,6,6.5,14,255),(5,'2026-08-18 11:58:05.273055','2026-08-18 11:58:05.273093','Cá Thần Tiên','Pterophyllum scalare','Thông thường là một loài cá cichlid (họ cá rô phi) hiền lành nhưng có thể hung dữ với đồng loại, vì vậy nên nuôi trong nhóm nhỏ. Là cá nuôi chung với loài khác tốt nhưng có thể ăn cá cảnh nước ngọt nhỏ khác.',24,30,0,7.4,15,200),(6,'2026-08-18 11:58:05.294904','2026-08-18 11:58:05.294940','Cá Betta','Betta splendens','Loài này sinh sống ở những vùng nước tĩnh hoặc chảy chậm, bao gồm ruộng lúa, đầm lầy, mương ven đường, suối và ao hồ. Các khu vực này thường được che phủ bởi thảm thực vật thủy sinh (chìm, nổi hoặc mọc ven bờ). Loài này không phù hợp để nuôi trong bể cộng đồng thông thường; do các yêu cầu về chăm sóc và tập tính, tốt nhất là nên nuôi chúng riêng lẻ. Đôi khi, một số cá thể có thể chấp nhận sống chung với các loài khác, nhưng đây chỉ là trường hợp ngoại lệ chứ không phải phổ biến.Tuyệt đối tránh nuôi chung với loài có vây dài/tương tự hình dáng vì cá đực có thể xem đó là đối thủ. Betta cảnh thường hung dữ hơn Betta hoang dã, hầu hết chỉ nên nuôi 1 con/bể.  Người ta thường tách riêng con đực với con cái trừ khi cho sinh sản.',22,30,5,8,7,41),(7,'2026-08-18 11:58:05.301294','2026-08-18 11:58:05.301325','Cá Xecan','Puntigrus tetrazona','Loài này nổi tiếng hung dữ và hay cắn vây các loài cá khác. Tuy nhiên, hành vi này thường chỉ trở nên nghiêm trọng khi cá được nuôi với số lượng quá ít hoặc không gian bể bị hạn chế. Dù vậy, do bản tính khá hiếu động, chúng không phải là bạn cùng bể lý tưởng cho các loài nhút nhát, bơi chậm hoặc có vây dài, chẳng hạn như nhiều loài cá đẻ con (livebearer), cá rô phi (cichlid), cá tai tượng. Có tính bầy đàn, hình thành thứ bậc, nên mua tối thiểu 8-10 con để giảm tấn công loài khác và tạo nên vẻ đẹp tự nhiên hơn cho đàn cá',20,26,5,8,6,72),(8,'2026-08-18 11:58:05.310686','2026-08-18 11:58:05.310770','Cá Molly','Poecilia sphenops','Là loài hiền hòa, nhưng chỉ nên nuôi cùng loài chịu được cùng điều kiện nước. Hợp với các loài Poecilia khác, một số cá cầu vồng (rainbowfish) và loài chịu nước cứng.',21,28,7,8.5,8,81),(9,'2026-08-18 11:58:05.318263','2026-08-18 11:58:05.318297','Cá Ali','Labidochromis caeruleus','Đây là loài cá tương đối hiền lành, rất thích hợp để nuôi trong các bể cộng đồng dành cho cá ưa nước cứng. Chúng cũng có thể sống hòa hợp với các loài cá cầu vồng (rainbowfish) ưa nước cứng và một số loài thuộc họ Cá chép (Cyprinidae). Có thể nuôi theo nhóm nhưng trở nên có tính lãnh thổ khi sinh sản. Con đực khá tích cực đeo bám con cái nên nên nuôi nhiều cá cái hơn cá đực.',24,28,7.7,10,10,160),(10,'2026-08-18 11:58:05.328307','2026-08-18 11:58:05.328341','Cá Cầu vồng','Melanotaenia boesemani','Cá cầu vồng thường tập trung ở những vùng nước nông, trong trẻo của hồ, nơi thảm thực vật thủy sinh phát triển dày đặc. Chúng có tập tính rất hiền hòa, nhưng do kích thước tương đối lớn và khả năng bơi lội nhanh nhẹn, chúng có thể làm các loài cá nhỏ hơn hoặc bơi chậm cảm thấy bị quấy rầy. Các loài cá thích hợp để nuôi chung bao gồm những loài cá cầu vồng có kích thước tương đương, cá thuộc họ Characin (như Neon...), cá Barb (cá rô phi cảnh nhỏ) và cá Chuột. Cá cầu vồng khá nhút nhát và sẽ phát triển tốt hơn nhiều khi được nuôi theo đàn với số lượng ít nhất từ ​​6-8 con. Việc nuôi chung với các cá thể cùng loài cũng giúp cá đực phô diễn được màu sắc rực rỡ nhất của mình.',27,30,7,10,11,110),(11,'2026-08-18 11:58:05.335157','2026-08-18 11:58:05.335189','Cá Hồng nhung','Hyphessobrycon eques','Loài này thường sống ở các nhánh sông chảy chậm, vùng nước tĩnh hoặc các vũng nước đọng (bao gồm ao và hồ nhỏ), nơi chúng tập trung thành đàn quanh các thảm thực vật ven bờ hoặc rễ cây ngập nước. Đây là loài nổi tiếng hung dữ, hay cắn vây loài khác, bộc lộ rõ nhất khi nuôi số lượng ít hoặc bể chật. Chúng ưa sống theo đàn và hình thành hệ thống phân cấp, trong đó các con đực thường xuyên tranh giành nhau để thu hút con cái và khẳng định vị thế trong đàn. Nên nuôi một đàn tối thiểu 12 con, việc này không chỉ giúp cá tập trung với nhau thay vì quấy rầy các loài khác trong bể mà còn tạo ra hiệu ứng thị giác tự nhiên và ấn tượng hơn. Do bản tính khá hiếu động, loài này không phù hợp để nuôi chung với những loài cá nhút nhát, bơi chậm hoặc có vây dài, chẳng hạn như nhiều loài cá đẻ con (livebearer), cá rô phi (cichlid) và cá thuộc bộ Cá mang liền (anabantoid). Nên chọn loài có kích thước tương đương hoặc loài bơi ở tầng trên để nuôi chung.',20,28,5,7.5,4,72),(12,'2026-08-18 11:58:05.345626','2026-08-18 11:58:05.345660','Cá Bác sĩ Panda Garra','Garra flavatra','Đây là loài tương đối hiền lành với tập tính tốt là dọn bể. Chúng không thực sự hòa thuận với các cá thể cùng loài nhưng thường sống thành những nhóm trong môi trường tự nhiên. Nếu nuôi đơn lẻ, chúng có xu hướng hung dữ hơn đối với các loài cá có hình dáng tương đồng. Do đó nên nuôi theo nhóm từ 3-4 con trở lên nếu điều kiện không gian cho phép. Trong một nhóm như vậy, chúng sẽ thiết lập trật tự thứ bậc rõ rệt nhưng thường ít gây hấn với các loài cá khác trong bể.',22,27,6.5,7.5,9,81),(13,'2026-08-18 11:58:05.351792','2026-08-18 11:58:05.351817','Cá Điện Quang','Rocio octofasciata','Nhìn chung là loài có khả năng thích nghi cao với nhiều môi trường sống khác nhau, bao gồm lòng sông, kênh đào nhân tạo, mương thoát nước, cũng như ao hồ. Có thể nuôi trong bể cá với các loài đủ lớn để không bị xem là con mồi, nhưng nếu nuôi cùng Cá Hoàng đế (cichlid) khác cần bể rất lớn.',20,30,6.5,8,20,243);
/*!40000 ALTER TABLE `aquahomeapp_species` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aquahomeapp_speciesfeature`
--

DROP TABLE IF EXISTS `aquahomeapp_speciesfeature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_speciesfeature` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `feature_id` bigint NOT NULL,
  `species_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_species_feature` (`species_id`,`feature_id`),
  KEY `aquahomeapp_speciesf_feature_id_f0168783_fk_aquahomea` (`feature_id`),
  CONSTRAINT `aquahomeapp_speciesf_feature_id_f0168783_fk_aquahomea` FOREIGN KEY (`feature_id`) REFERENCES `aquahomeapp_feature` (`id`),
  CONSTRAINT `aquahomeapp_speciesf_species_id_97a842f9_fk_aquahomea` FOREIGN KEY (`species_id`) REFERENCES `aquahomeapp_species` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_speciesfeature`
--

LOCK TABLES `aquahomeapp_speciesfeature` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_speciesfeature` DISABLE KEYS */;
INSERT INTO `aquahomeapp_speciesfeature` VALUES (1,'2026-08-18 11:58:05.485027','2026-08-18 11:58:05.485059',1,1),(2,'2026-08-18 11:58:05.497050','2026-08-18 11:58:05.497094',5,1),(3,'2026-08-18 11:58:05.505663','2026-08-18 11:58:05.505697',10,1),(4,'2026-08-18 11:58:05.516718','2026-08-18 11:58:05.516750',1,2),(5,'2026-08-18 11:58:05.529387','2026-08-18 11:58:05.529421',7,2),(6,'2026-08-18 11:58:05.535798','2026-08-18 11:58:05.535822',10,2),(7,'2026-08-18 11:58:05.547460','2026-08-18 11:58:05.547493',1,3),(8,'2026-08-18 11:58:05.554790','2026-08-18 11:58:05.554813',7,3),(9,'2026-08-18 11:58:05.566571','2026-08-18 11:58:05.566603',11,3),(10,'2026-08-18 11:58:05.578407','2026-08-18 11:58:05.580214',1,4),(11,'2026-08-18 11:58:05.591833','2026-08-18 11:58:05.591871',10,4),(12,'2026-08-18 11:58:05.599781','2026-08-18 11:58:05.599815',1,5),(13,'2026-08-18 11:58:05.616722','2026-08-18 11:58:05.616753',10,5),(14,'2026-08-18 11:58:05.628550','2026-08-18 11:58:05.628585',3,6),(15,'2026-08-18 11:58:05.638786','2026-08-18 11:58:05.638828',8,6),(16,'2026-08-18 11:58:05.651775','2026-08-18 11:58:05.651807',5,6),(17,'2026-08-18 11:58:05.665858','2026-08-18 11:58:05.665892',9,6),(18,'2026-08-18 11:58:05.676958','2026-08-18 11:58:05.677039',4,7),(19,'2026-08-18 11:58:05.684996','2026-08-18 11:58:05.685029',2,7),(20,'2026-08-18 11:58:05.699662','2026-08-18 11:58:05.699693',7,7),(21,'2026-08-18 11:58:05.712892','2026-08-18 11:58:05.712927',10,7),(22,'2026-08-18 11:58:05.722260','2026-08-18 11:58:05.722283',1,8),(23,'2026-08-18 11:58:05.733335','2026-08-18 11:58:05.733368',10,8),(24,'2026-08-18 11:58:05.748183','2026-08-18 11:58:05.748219',2,9),(25,'2026-08-18 11:58:05.757391','2026-08-18 11:58:05.757454',6,9),(26,'2026-08-18 11:58:05.768155','2026-08-18 11:58:05.768177',10,9),(27,'2026-08-18 11:58:05.776697','2026-08-18 11:58:05.776734',11,9),(28,'2026-08-18 11:58:05.784383','2026-08-18 11:58:05.784407',1,10),(29,'2026-08-18 11:58:05.795086','2026-08-18 11:58:05.795111',7,10),(30,'2026-08-18 11:58:05.801724','2026-08-18 11:58:05.801747',9,10),(31,'2026-08-18 11:58:05.810599','2026-08-18 11:58:05.810638',10,10),(32,'2026-08-18 11:58:05.818666','2026-08-18 11:58:05.818690',4,11),(33,'2026-08-18 11:58:05.827732','2026-08-18 11:58:05.827771',2,11),(34,'2026-08-18 11:58:05.834790','2026-08-18 11:58:05.834819',7,11),(35,'2026-08-18 11:58:05.844263','2026-08-18 11:58:05.844297',10,11),(36,'2026-08-18 11:58:05.851982','2026-08-18 11:58:05.852012',6,12),(37,'2026-08-18 11:58:05.860795','2026-08-18 11:58:05.860831',7,12),(38,'2026-08-18 11:58:05.868299','2026-08-18 11:58:05.868328',11,12),(39,'2026-08-18 11:58:05.878201','2026-08-18 11:58:05.878238',3,13),(40,'2026-08-18 11:58:05.885592','2026-08-18 11:58:05.885617',6,13),(41,'2026-08-18 11:58:05.896537','2026-08-18 11:58:05.896576',10,13),(42,'2026-08-18 11:58:05.905630','2026-08-18 11:58:05.905654',11,13);
/*!40000 ALTER TABLE `aquahomeapp_speciesfeature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aquahomeapp_user`
--

DROP TABLE IF EXISTS `aquahomeapp_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_user`
--

LOCK TABLES `aquahomeapp_user` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_user` DISABLE KEYS */;
INSERT INTO `aquahomeapp_user` VALUES (1,'pbkdf2_sha256$1000000$f0R6BvidCp7Bdt9eaovf1P$Qgyz8HWeX855T/vuSD50sPGueoPGfbDgKnskyiVsvcY=','2026-08-30 11:12:37.000000',1,'admin','Ha Nguyen Minh','Thu',1,'2026-08-18 11:29:10.000000','admin@gmail.com','0986917405',NULL,'ADMIN',1,'2026-08-18 11:29:10.750441'),(2,'pbkdf2_sha256$1000000$uaYMtX9CTmmW0I6tRFL7uN$tFyMkF7ucUxPJTnUI85AfkDZijIvYrgDLLoNdQLHnvo=',NULL,0,'s1','','',1,'2026-08-30 11:41:02.400284','staff1@gmail.com','0988865423',NULL,'STAFF',1,'2026-08-30 11:41:03.252628'),(3,'pbkdf2_sha256$1000000$RzeugcEZyPg1yTsbMa3jne$8c+WNC3nbpqMnH2ITE6XUjTpdNmuZpAFbqbmTKQUTUY=',NULL,0,'user1','','',0,'2026-08-30 12:31:46.259245','u1@gmail.com','0900000002',NULL,'CUSTOMER',1,'2026-08-30 12:31:46.846302'),(4,'pbkdf2_sha256$1000000$smpUAzdhuC5qWmcLPgKBr6$6vm8WBGnqAjTLj3QhjXzWBTROpnYVm70yrtAfX1xUZ8=',NULL,0,'s2','Minh Thư','Hà',1,'2026-09-07 05:27:50.831625','s2@gmail.com','0987654312',NULL,'STAFF',1,'2026-09-07 05:27:51.385074');
/*!40000 ALTER TABLE `aquahomeapp_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aquahomeapp_user_groups`
--

DROP TABLE IF EXISTS `aquahomeapp_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aquahomeapp_user_groups_user_id_group_id_3a3e60e2_uniq` (`user_id`,`group_id`),
  KEY `aquahomeapp_user_groups_group_id_bcd47f2a_fk_auth_group_id` (`group_id`),
  CONSTRAINT `aquahomeapp_user_groups_group_id_bcd47f2a_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `aquahomeapp_user_groups_user_id_eda34f1c_fk_aquahomeapp_user_id` FOREIGN KEY (`user_id`) REFERENCES `aquahomeapp_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_user_groups`
--

LOCK TABLES `aquahomeapp_user_groups` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `aquahomeapp_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aquahomeapp_user_user_permissions`
--

DROP TABLE IF EXISTS `aquahomeapp_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquahomeapp_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aquahomeapp_user_user_pe_user_id_permission_id_046c0f5d_uniq` (`user_id`,`permission_id`),
  KEY `aquahomeapp_user_use_permission_id_d4082376_fk_auth_perm` (`permission_id`),
  CONSTRAINT `aquahomeapp_user_use_permission_id_d4082376_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `aquahomeapp_user_use_user_id_74f2c541_fk_aquahomea` FOREIGN KEY (`user_id`) REFERENCES `aquahomeapp_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquahomeapp_user_user_permissions`
--

LOCK TABLES `aquahomeapp_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `aquahomeapp_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `aquahomeapp_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add category',6,'add_category'),(22,'Can change category',6,'change_category'),(23,'Can delete category',6,'delete_category'),(24,'Can view category',6,'view_category'),(25,'Can add user',7,'add_user'),(26,'Can change user',7,'change_user'),(27,'Can delete user',7,'delete_user'),(28,'Can view user',7,'view_user'),(29,'Can add product',8,'add_product'),(30,'Can change product',8,'change_product'),(31,'Can delete product',8,'delete_product'),(32,'Can view product',8,'view_product'),(33,'Can add order',9,'add_order'),(34,'Can change order',9,'change_order'),(35,'Can delete order',9,'delete_order'),(36,'Can view order',9,'view_order'),(37,'Can add order item',10,'add_orderitem'),(38,'Can change order item',10,'change_orderitem'),(39,'Can delete order item',10,'delete_orderitem'),(40,'Can view order item',10,'view_orderitem'),(41,'Can add species',11,'add_species'),(42,'Can change species',11,'change_species'),(43,'Can delete species',11,'delete_species'),(44,'Can view species',11,'view_species'),(45,'Can add product recommendation',12,'add_productrecommendation'),(46,'Can change product recommendation',12,'change_productrecommendation'),(47,'Can delete product recommendation',12,'delete_productrecommendation'),(48,'Can view product recommendation',12,'view_productrecommendation'),(49,'Can add feature',13,'add_feature'),(50,'Can change feature',13,'change_feature'),(51,'Can delete feature',13,'delete_feature'),(52,'Can view feature',13,'view_feature'),(53,'Can add species feature',14,'add_speciesfeature'),(54,'Can change species feature',14,'change_speciesfeature'),(55,'Can delete species feature',14,'delete_speciesfeature'),(56,'Can view species feature',14,'view_speciesfeature'),(57,'Can add application',15,'add_application'),(58,'Can change application',15,'change_application'),(59,'Can delete application',15,'delete_application'),(60,'Can view application',15,'view_application'),(61,'Can add access token',16,'add_accesstoken'),(62,'Can change access token',16,'change_accesstoken'),(63,'Can delete access token',16,'delete_accesstoken'),(64,'Can view access token',16,'view_accesstoken'),(65,'Can add grant',17,'add_grant'),(66,'Can change grant',17,'change_grant'),(67,'Can delete grant',17,'delete_grant'),(68,'Can view grant',17,'view_grant'),(69,'Can add refresh token',18,'add_refreshtoken'),(70,'Can change refresh token',18,'change_refreshtoken'),(71,'Can delete refresh token',18,'delete_refreshtoken'),(72,'Can view refresh token',18,'view_refreshtoken'),(73,'Can add id token',19,'add_idtoken'),(74,'Can change id token',19,'change_idtoken'),(75,'Can delete id token',19,'delete_idtoken'),(76,'Can view id token',19,'view_idtoken'),(77,'Can add device grant',20,'add_devicegrant'),(78,'Can change device grant',20,'change_devicegrant'),(79,'Can delete device grant',20,'delete_devicegrant'),(80,'Can view device grant',20,'view_devicegrant');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_aquahomeapp_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_aquahomeapp_user_id` FOREIGN KEY (`user_id`) REFERENCES `aquahomeapp_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2026-08-30 11:40:55.890604','1','admin@gmail.com [ADMIN]',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Phone\", \"Role\"]}}]',7,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(6,'aquahomeapp','category'),(13,'aquahomeapp','feature'),(9,'aquahomeapp','order'),(10,'aquahomeapp','orderitem'),(8,'aquahomeapp','product'),(12,'aquahomeapp','productrecommendation'),(11,'aquahomeapp','species'),(14,'aquahomeapp','speciesfeature'),(7,'aquahomeapp','user'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(16,'oauth2_provider','accesstoken'),(15,'oauth2_provider','application'),(20,'oauth2_provider','devicegrant'),(17,'oauth2_provider','grant'),(19,'oauth2_provider','idtoken'),(18,'oauth2_provider','refreshtoken'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-08-18 11:28:29.906574'),(2,'contenttypes','0002_remove_content_type_name','2026-08-18 11:28:30.066683'),(3,'auth','0001_initial','2026-08-18 11:28:30.394038'),(4,'auth','0002_alter_permission_name_max_length','2026-08-18 11:28:30.488855'),(5,'auth','0003_alter_user_email_max_length','2026-08-18 11:28:30.495767'),(6,'auth','0004_alter_user_username_opts','2026-08-18 11:28:30.506303'),(7,'auth','0005_alter_user_last_login_null','2026-08-18 11:28:30.518652'),(8,'auth','0006_require_contenttypes_0002','2026-08-18 11:28:30.524977'),(9,'auth','0007_alter_validators_add_error_messages','2026-08-18 11:28:30.535920'),(10,'auth','0008_alter_user_username_max_length','2026-08-18 11:28:30.547560'),(11,'auth','0009_alter_user_last_name_max_length','2026-08-18 11:28:30.558572'),(12,'auth','0010_alter_group_name_max_length','2026-08-18 11:28:30.583189'),(13,'auth','0011_update_proxy_permissions','2026-08-18 11:28:30.592326'),(14,'auth','0012_alter_user_first_name_max_length','2026-08-18 11:28:30.603016'),(15,'aquahomeapp','0001_initial','2026-08-18 11:28:31.152144'),(16,'admin','0001_initial','2026-08-18 11:28:31.328749'),(17,'admin','0002_logentry_remove_auto_add','2026-08-18 11:28:31.335820'),(18,'admin','0003_logentry_add_action_flag_choices','2026-08-18 11:28:31.346498'),(19,'aquahomeapp','0002_order_orderitem','2026-08-18 11:28:31.587327'),(20,'aquahomeapp','0003_species_alter_category_name_alter_product_price_and_more','2026-08-18 11:28:31.909075'),(21,'aquahomeapp','0004_feature_speciesfeature','2026-08-18 11:28:32.164837'),(22,'oauth2_provider','0001_initial','2026-08-18 11:28:33.000318'),(23,'oauth2_provider','0002_auto_20190406_1805','2026-08-18 11:28:33.163732'),(24,'oauth2_provider','0003_auto_20201211_1314','2026-08-18 11:28:33.252481'),(25,'oauth2_provider','0004_auto_20200902_2022','2026-08-18 11:28:33.757006'),(26,'oauth2_provider','0005_auto_20211222_2352','2026-08-18 11:28:33.875899'),(27,'oauth2_provider','0006_alter_application_client_secret','2026-08-18 11:28:33.908826'),(28,'oauth2_provider','0007_application_post_logout_redirect_uris','2026-08-18 11:28:33.993256'),(29,'oauth2_provider','0008_alter_accesstoken_token','2026-08-18 11:28:34.005078'),(30,'oauth2_provider','0009_add_hash_client_secret','2026-08-18 11:28:34.116859'),(31,'oauth2_provider','0010_application_allowed_origins','2026-08-18 11:28:34.215893'),(32,'oauth2_provider','0011_refreshtoken_token_family','2026-08-18 11:28:34.313263'),(33,'oauth2_provider','0012_add_token_checksum','2026-08-18 11:28:34.607274'),(34,'oauth2_provider','0013_alter_application_authorization_grant_type_device','2026-08-18 11:28:34.790036'),(35,'sessions','0001_initial','2026-08-18 11:28:34.834971');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('ivux3e7x2xqbrvdsnci59t1hv2kdwep9','.eJxVjEEOwiAQAP-yZ0MWBEp79N43kIVdpGrapLQn499Nkx70OjOZN0Tatxr3JmucGAbQcPllifJT5kPwg-b7ovIyb-uU1JGo0zY1Liyv29n-DSq1CgMEDCVoizawx8743HeMlFhz0JqLwd6ReBeKaC_OW4fpmo1I7zNaQwY-X8MlNz8:1x0dSn:wJ8s5yHDtglQt0wXcuUHtQu8JflOOnVW5AfutImQ2Gg','2026-09-13 11:12:37.570615');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_accesstoken`
--

DROP TABLE IF EXISTS `oauth2_provider_accesstoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_accesstoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `source_refresh_token_id` bigint DEFAULT NULL,
  `id_token_id` bigint DEFAULT NULL,
  `token_checksum` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `oauth2_provider_accesstoken_token_checksum_85319a26_uniq` (`token_checksum`),
  UNIQUE KEY `source_refresh_token_id` (`source_refresh_token_id`),
  UNIQUE KEY `id_token_id` (`id_token_id`),
  KEY `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_acce_user_id_6e4c9a65_fk_aquahomea` (`user_id`),
  CONSTRAINT `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_acce_id_token_id_85db651b_fk_oauth2_pr` FOREIGN KEY (`id_token_id`) REFERENCES `oauth2_provider_idtoken` (`id`),
  CONSTRAINT `oauth2_provider_acce_source_refresh_token_e66fbc72_fk_oauth2_pr` FOREIGN KEY (`source_refresh_token_id`) REFERENCES `oauth2_provider_refreshtoken` (`id`),
  CONSTRAINT `oauth2_provider_acce_user_id_6e4c9a65_fk_aquahomea` FOREIGN KEY (`user_id`) REFERENCES `aquahomeapp_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_accesstoken`
--

LOCK TABLES `oauth2_provider_accesstoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_accesstoken` VALUES (1,'tvkDm8L7nMNzSF9tyEjrRQiOxYI2US','2026-08-30 21:32:53.532602','read write',1,1,'2026-08-30 11:32:53.533057','2026-08-30 11:32:53.533065',NULL,NULL,'50bfaf5eb9d27f40e794b7a44d7879b6c96b81f1eb9541c6ce518c6c29fe648a'),(2,'2LOPynQmUq2QJkvg8ZXGubufZgHIRV','2026-08-30 21:39:42.887478','read write',1,1,'2026-08-30 11:39:42.887887','2026-08-30 11:39:42.887899',NULL,NULL,'01667a6eaeed1ea5e3773b0c8f3841433a71349307f57949dae5cb0206ab4637'),(3,'fn3dJdP5acEzxVjMglcmm84B218qPo','2026-08-30 21:47:52.135134','read write',1,2,'2026-08-30 11:47:52.135467','2026-08-30 11:47:52.135474',NULL,NULL,'445737ae374725f676806d44068df43d725a75c5fd3191f0758241f90c02b481'),(4,'RvTGUliJXnlulPFZmsHiOk5z41WkGN','2026-08-30 21:50:34.072252','read write',1,2,'2026-08-30 11:50:34.072569','2026-08-30 11:50:34.072577',NULL,NULL,'4214738b7a7f9c7cc015a040de65f3497b1915b16354532c7f87a0c7a25f0500'),(5,'lRFec5YRD1D46hUx0Q4Ik1UPNy6QkO','2026-08-30 21:52:13.323165','read write',1,1,'2026-08-30 11:52:13.323471','2026-08-30 11:52:13.323478',NULL,NULL,'badb4e3ca8d6f619e4430208ae0bbf2acc2ee62ce0e61c4022ed88ff75d4ae76'),(6,'HB0s4nDV1Er5EBsxIBPlUnuUvZG5Ul','2026-08-30 21:52:36.733050','read write',1,2,'2026-08-30 11:52:36.733798','2026-08-30 11:52:36.733812',NULL,NULL,'dfaf7f665fe3e72fd8fa6d1438bc7c728440e7f7d79d7767e8fa5dcafe021d02'),(7,'PgUCnnFhGoxZhQOwBupT9qDZG8ABSa','2026-08-30 22:28:20.093985','read write',1,2,'2026-08-30 12:28:20.094423','2026-08-30 12:28:20.094434',NULL,NULL,'6e7da22c16b9e8b36dc623d8673920cf6d261af93fd0ac6cd3f73b05e0842005'),(8,'ZC0ydbJTKjjxSgrIwB6WLOjCNC14fZ','2026-08-30 22:31:56.672305','read write',1,3,'2026-08-30 12:31:56.672726','2026-08-30 12:31:56.672735',NULL,NULL,'439fefd90827e919133042580d42f2c98b0a47a388533263ef17ce36e3a06877'),(9,'l5eu4AHQ5SKQfSOkYLk3VyMuevBg4u','2026-08-30 22:36:14.182142','read write',1,2,'2026-08-30 12:36:14.182653','2026-08-30 12:36:14.182665',NULL,NULL,'59b56abf95d2f2b80d58d91bf15958a25a385ec4d37c7dbe0ed92c4a97381986'),(10,'oJumNfWQvEAvZ810Fd2URruzlXIuGD','2026-08-30 22:36:15.701841','read write',1,2,'2026-08-30 12:36:15.702150','2026-08-30 12:36:15.702158',NULL,NULL,'150a749fc0bef75e27b518abe82a175ef7363c573a6e7d13eef0d7c8aec37f66'),(11,'dI9GBhXbhrb5AcM4dUJ4Sw4lv4DlAC','2026-08-30 22:39:34.470062','read write',1,2,'2026-08-30 12:39:34.470351','2026-08-30 12:39:34.470358',NULL,NULL,'e9df06579662ade89e79ebf8faecf84fbb0166eefcd76dcc26dbe2a3b8f272e0'),(12,'ELsIQsbGNnSnPm6BJOGFr6FDB80YXC','2026-08-30 22:43:10.701360','read write',1,2,'2026-08-30 12:43:10.701694','2026-08-30 12:43:10.701701',NULL,NULL,'45dd6430b0e10008be605d2067697101c53842d308b899deb33a7b1d5dc771b0'),(13,'mOXcklQoSgfSANGbhaL4DBb3vBdlLs','2026-08-30 22:44:18.869181','read write',1,3,'2026-08-30 12:44:18.869514','2026-08-30 12:44:18.869521',NULL,NULL,'f53ca22a7b184f279db7c38e0d301d455a36754f2004218919b0b6c421d5c06f'),(14,'peWJwzrnMT4kSh3wXWvinKYiGHrPa9','2026-08-30 22:44:54.927223','read write',1,3,'2026-08-30 12:44:54.927651','2026-08-30 12:44:54.927666',NULL,NULL,'69fc5507528123a2a88c0d9c83cbfd921c932bbe260c12d59fc8cae11d25a059'),(15,'wk4CJgU1ZDQxD8ricNruSMEOX209EE','2026-08-30 22:44:56.433175','read write',1,3,'2026-08-30 12:44:56.433607','2026-08-30 12:44:56.433616',NULL,NULL,'41aa133701b5811286db3de0073e1b1ad1ff8aa8207958c4649c7f4f479dd286'),(16,'CN3txCJkVF8yBp0fTMEHrvmVdP89bn','2026-08-30 23:00:30.150640','read write',1,2,'2026-08-30 13:00:30.150997','2026-08-30 13:00:30.151005',NULL,NULL,'d8941eda280d5e52aa1b182ff55eede7a030ac86f0879c1502200b60f639ef02'),(17,'ps0AMxEX3RrJ6z9P2UE0C9rllTfaQK','2026-08-30 23:01:39.685717','read write',1,3,'2026-08-30 13:01:39.686155','2026-08-30 13:01:39.686163',NULL,NULL,'75863daa843d9c4533cefb934bf32401d5bbbe4693f02d4fdd54cad04eeea711'),(18,'i1yneG1A3lxbTzPPRQqmrOaXTjPY9H','2026-08-31 16:16:30.566028','read write',1,3,'2026-08-31 06:16:30.567175','2026-08-31 06:16:30.567202',NULL,NULL,'6a3da59e4e5c8cd2a5f3f8d305aefcfd9c1ee1f92af723dcf16d3560e5b911b2'),(19,'zKYQc9A2Dr2l8GYZD9fKweWQVmCzmW','2026-08-31 16:16:33.032105','read write',1,3,'2026-08-31 06:16:33.032840','2026-08-31 06:16:33.032856',NULL,NULL,'b77a7936574ff7d616e355eaf2ec49d92d5833c040bfa7d7f02f8de7fc97d98b'),(20,'LC06x6ms1HwYfMo8RD7kMpcucDfjFM','2026-08-31 16:16:35.775573','read write',1,3,'2026-08-31 06:16:35.776681','2026-08-31 06:16:35.776711',NULL,NULL,'2e27f481c7e2ddacf198e5fac57a4ecb43f05628d72138ff298420ac5c544f98'),(21,'IzSVP5c5m13BzhgbjWN3WTrMS7esfz','2026-08-31 16:19:30.627762','read write',1,2,'2026-08-31 06:19:30.628553','2026-08-31 06:19:30.628576',NULL,NULL,'8250b37a8098bea7266847952014d03f3ca0a9d162c1eaefc5e9edac0f10f630'),(22,'MD3sfu1PPgpAs3Vp0kJnS7wFQBtTbC','2026-08-31 16:22:58.859907','read write',1,3,'2026-08-31 06:22:58.860487','2026-08-31 06:22:58.860505',NULL,NULL,'1e4b4fb2bc5e60d0656144020ab7da4a08c04e88f60e3c764e33805438189b3d'),(23,'W1jTZwABs0CJfdYuPp4gqgb7tAkuIc','2026-08-31 16:23:01.731218','read write',1,3,'2026-08-31 06:23:01.731717','2026-08-31 06:23:01.731730',NULL,NULL,'5eb3134e62a2712a04c8c391cfc264113d5543ea9e40e4c2b1feea290e99a843'),(24,'QWb3HQHO2V3Bq7ycY7lO8BheQOUCP0','2026-09-07 15:25:04.258525','read write',1,1,'2026-09-07 05:25:04.259008','2026-09-07 05:25:04.259020',NULL,NULL,'12658e99b2d8a2722dc5c28cd4ef884d0e4dbc6781b4a4a97c6e5d1179fd6179'),(25,'gXS8G1KELIe04jIc8Z4dVhWwZJbSIT','2026-09-07 20:32:22.318930','read write',1,1,'2026-09-07 10:32:22.323196','2026-09-07 10:32:22.323206',NULL,NULL,'de6884b1ff42550513036525599e2d8009b49376782c018f6aae8bf56ab08183'),(26,'o2MWW2Bd2Nm0slPKHZlvNDL1QYnZUZ','2026-09-07 20:34:22.744478','read write',1,1,'2026-09-07 10:34:22.744766','2026-09-07 10:34:22.744773',NULL,NULL,'55a68dc950f368363d06b00c6260d026d060bfbf3f6d8ddd8bc74d1904288974'),(27,'MvM1uM3lThQzPT8sSRJel1CtoNAOTd','2026-09-07 20:34:56.957677','read write',1,1,'2026-09-07 10:34:56.958094','2026-09-07 10:34:56.958106',NULL,NULL,'09db71b25b153a2f4f5ed84608d3330c4ff62589216dcad38290aa30f6ff1c64'),(28,'XUiDSNsvzree0aU2jo7nvlVQkRIA86','2026-09-07 20:34:58.122492','read write',1,1,'2026-09-07 10:34:58.122771','2026-09-07 10:34:58.122779',NULL,NULL,'bf3ce3ba450da1a301c751790a56f85b73bb6084f52113137033aabff4e5eaea'),(29,'FTtULJJhLWnJsc3O2T7yRdiSQpOYmj','2026-09-07 21:01:22.293493','read write',1,3,'2026-09-07 11:01:22.293839','2026-09-07 11:01:22.293846',NULL,NULL,'694eea3dab3291a23588f579dcf42b4669c563e7d1e122fa7ade7301e44d5ebd'),(30,'YsPOJHdsxbLl9zLCcQSebJHvKz3uB7','2026-09-07 21:09:06.585608','read write',1,1,'2026-09-07 11:09:06.585940','2026-09-07 11:09:06.585947',NULL,NULL,'da3c93c74a64c6212bb49eef5197f790fb2306d8de5b76b30eb15ba1423600a0'),(31,'fHipDSSYgnGT4fe9VnMKrRFLLEleEp','2026-09-07 21:14:28.522030','read write',1,2,'2026-09-07 11:14:28.522379','2026-09-07 11:14:28.522386',NULL,NULL,'d9903e6e18f4fa10194a1d06e95609948fc6b8704f7941f71577ec2129fcd91e'),(32,'Ij2bKbjMRIjxwtEtFa8Vx9Xs9oyeLV','2026-09-07 21:15:18.359067','read write',1,3,'2026-09-07 11:15:18.359343','2026-09-07 11:15:18.359352',NULL,NULL,'72dc18b45aca58fda2244fe547d90f8dabc16a9dd1688e24279e36b014786186'),(33,'tzv2shIMBTzIGjtnWW4qo51rv6gTW2','2026-09-08 14:37:13.796008','read write',1,3,'2026-09-08 04:37:13.796768','2026-09-08 04:37:13.796785',NULL,NULL,'d3b52183b9122b76ea77ac650bb02127144ad915beb746a3434a6abc86bf876c'),(34,'GepGz3JlILpJ2bMxOxQWIuInH51ASY','2026-09-08 14:37:16.760762','read write',1,3,'2026-09-08 04:37:16.761237','2026-09-08 04:37:16.761252',NULL,NULL,'694f436178c692a710940aac5f758ee3124c5f5ee16f8ab6939801720f91dcdd'),(35,'RsdKYSdbSJbayeBrHsgRT795C1LJfc','2026-09-08 15:39:56.176381','read write',1,3,'2026-09-08 05:39:56.177337','2026-09-08 05:39:56.177345',NULL,NULL,'77eb2aaea31155520f5ce7a2a62a1f996f4d6b2161468a68fbdb04d25890c2a8'),(36,'xM1r5OOVCSEdTwB73nB4mpYMDnGJ5G','2026-09-08 16:00:31.038929','read write',1,2,'2026-09-08 06:00:31.039243','2026-09-08 06:00:31.039252',NULL,NULL,'6ab6bf04230abe7d1911718b2e71c2fa70380d79656ee15818850c887d4440fd'),(37,'jn86pXePsrpVk3hFUrxmN1MKjN3Z2d','2026-09-08 16:24:27.295179','read write',1,1,'2026-09-08 06:24:27.295522','2026-09-08 06:24:27.295530',NULL,NULL,'317d6e72a4be05f6cd9bd460448f3947f5a84701d587d64e919fbe0c9bd6c66b'),(38,'MpWLJUylFAYf5sUZXsuXhbbPVf34Sx','2026-09-08 19:57:54.163030','read write',1,3,'2026-09-08 09:57:54.163519','2026-09-08 09:57:54.163531',NULL,NULL,'30eda50b039326b1a73081f64d780ead5960e060a4c0a4caa05ed38c11ea1aca'),(39,'S14BggCLxmSlq54bjVEZV7HZU3C2zX','2026-09-09 13:43:08.466498','read write',1,3,'2026-09-09 03:43:08.467708','2026-09-09 03:43:08.467728',NULL,NULL,'bc1471fb6da1caa002f75bbeaff661e31d978536ce3b16e6c19c8f891d63600e'),(40,'K4kncyAKJvtiRw26uWluF33FsYosXW','2026-09-09 13:54:25.449481','read write',1,3,'2026-09-09 03:54:25.450092','2026-09-09 03:54:25.450109',NULL,NULL,'93aedd469b60ebdaa029a95aa053c9053060de1c0374e2dfb192fc11e6529999'),(41,'k61j6ROnwhZCrdizqEsyMOBwnQKWoQ','2026-09-09 13:54:32.361749','read write',1,3,'2026-09-09 03:54:32.362239','2026-09-09 03:54:32.362257',NULL,NULL,'bfa8888f9980d088397369d5072384e18ded67ad90441fd9a6594518cf349dba'),(42,'S15QVaiQnoEZH1u4xGIXIvBamBjuNo','2026-09-09 14:20:01.684624','read write',1,1,'2026-09-09 04:20:01.691588','2026-09-09 04:20:01.691613',NULL,NULL,'ee325ed5385e530682d06f50ef0e6915dbdbdeabbfb301d9457dc1fe77660b98'),(43,'yOTHaNiRhlKpb9FUwE0P8Zz895xb3B','2026-09-09 14:20:03.563115','read write',1,1,'2026-09-09 04:20:03.563963','2026-09-09 04:20:03.563981',NULL,NULL,'1eb4fd09245718da6a194f44131c588c8ab746f957aa33bdf55685f1af3021a3'),(44,'xPucqKhWLhQV6J48lwuAPUTAgI3nky','2026-09-09 14:20:09.705177','read write',1,1,'2026-09-09 04:20:09.705728','2026-09-09 04:20:09.705748',NULL,NULL,'aa84bc274151cca9a057d17a306a84dd340df41e4ee809c2af9f6f8cfb3cb055'),(45,'WsbdCcatxh0PeJZTYR2hKjh9UNbSIv','2026-09-09 14:31:05.200350','read write',1,2,'2026-09-09 04:31:05.200899','2026-09-09 04:31:05.200916',NULL,NULL,'ac49e6a0fe708ef1ef5e535502ce62b99a5a00b28c26b44720ff234e2a04bf5b');
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_application`
--

DROP TABLE IF EXISTS `oauth2_provider_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_application` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `client_id` varchar(100) NOT NULL,
  `redirect_uris` longtext NOT NULL,
  `client_type` varchar(32) NOT NULL,
  `authorization_grant_type` varchar(44) NOT NULL,
  `client_secret` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `skip_authorization` tinyint(1) NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `algorithm` varchar(5) NOT NULL,
  `post_logout_redirect_uris` longtext NOT NULL,
  `hash_client_secret` tinyint(1) NOT NULL,
  `allowed_origins` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_id` (`client_id`),
  KEY `oauth2_provider_appl_user_id_79829054_fk_aquahomea` (`user_id`),
  KEY `oauth2_provider_application_client_secret_53133678` (`client_secret`),
  CONSTRAINT `oauth2_provider_appl_user_id_79829054_fk_aquahomea` FOREIGN KEY (`user_id`) REFERENCES `aquahomeapp_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_application`
--

LOCK TABLES `oauth2_provider_application` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_application` DISABLE KEYS */;
INSERT INTO `oauth2_provider_application` VALUES (1,'6wWJKQrnfPM8Ij2AokEL5R9vGGAnruGGXadEE4xB','','confidential','password','pbkdf2_sha256$1000000$QU0Ad5mDRhUZqwFqt0yst3$gT7HqJUqA5LnbRF/+iHt9tz44jBYLL5JP8XtnL/On+U=','My_App',1,0,'2026-08-30 11:31:17.144211','2026-08-30 11:31:17.144246','','',1,'');
/*!40000 ALTER TABLE `oauth2_provider_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_devicegrant`
--

DROP TABLE IF EXISTS `oauth2_provider_devicegrant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_devicegrant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `device_code` varchar(100) NOT NULL,
  `user_code` varchar(100) NOT NULL,
  `scope` varchar(64) DEFAULT NULL,
  `interval` int NOT NULL,
  `expires` datetime(6) NOT NULL,
  `status` varchar(64) NOT NULL,
  `client_id` varchar(100) NOT NULL,
  `last_checked` datetime(6) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `device_code` (`device_code`),
  UNIQUE KEY `oauth2_provider_devicegrant_unique_device_code` (`device_code`),
  KEY `oauth2_provider_devi_user_id_1cec5156_fk_aquahomea` (`user_id`),
  KEY `oauth2_provider_devicegrant_client_id_229dd06d` (`client_id`),
  CONSTRAINT `oauth2_provider_devi_user_id_1cec5156_fk_aquahomea` FOREIGN KEY (`user_id`) REFERENCES `aquahomeapp_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_devicegrant`
--

LOCK TABLES `oauth2_provider_devicegrant` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_devicegrant` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_devicegrant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_grant`
--

DROP TABLE IF EXISTS `oauth2_provider_grant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_grant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `expires` datetime(6) NOT NULL,
  `redirect_uri` longtext NOT NULL,
  `scope` longtext NOT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `code_challenge` varchar(128) NOT NULL,
  `code_challenge_method` varchar(10) NOT NULL,
  `nonce` varchar(255) NOT NULL,
  `claims` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_grant_user_id_e8f62af8_fk_aquahomeapp_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_grant_user_id_e8f62af8_fk_aquahomeapp_user_id` FOREIGN KEY (`user_id`) REFERENCES `aquahomeapp_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_grant`
--

LOCK TABLES `oauth2_provider_grant` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_grant` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_grant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_idtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_idtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_idtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `jti` char(32) NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jti` (`jti`),
  KEY `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_idtoken_user_id_dd512b59_fk_aquahomeapp_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_idtoken_user_id_dd512b59_fk_aquahomeapp_user_id` FOREIGN KEY (`user_id`) REFERENCES `aquahomeapp_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_idtoken`
--

LOCK TABLES `oauth2_provider_idtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_refreshtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_refreshtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `access_token_id` bigint DEFAULT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `revoked` datetime(6) DEFAULT NULL,
  `token_family` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `access_token_id` (`access_token_id`),
  UNIQUE KEY `oauth2_provider_refreshtoken_token_revoked_af8a5134_uniq` (`token`,`revoked`),
  KEY `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_refr_user_id_da837fce_fk_aquahomea` (`user_id`),
  CONSTRAINT `oauth2_provider_refr_access_token_id_775e84e8_fk_oauth2_pr` FOREIGN KEY (`access_token_id`) REFERENCES `oauth2_provider_accesstoken` (`id`),
  CONSTRAINT `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_refr_user_id_da837fce_fk_aquahomea` FOREIGN KEY (`user_id`) REFERENCES `aquahomeapp_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_refreshtoken`
--

LOCK TABLES `oauth2_provider_refreshtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_refreshtoken` VALUES (1,'OrFWcJ0BgsHgXwdwCge7ORanWJbIHC',1,1,1,'2026-08-30 11:32:53.541967','2026-08-30 11:32:53.541995',NULL,'2b14e22c5e004fefb8b7cdb7d186159c'),(2,'lqmYB2BdxtQzByZasvVvgRe6wBudvc',2,1,1,'2026-08-30 11:39:42.890687','2026-08-30 11:39:42.890709',NULL,'ab848ff6f7a64785a08f17e026f1c46b'),(3,'YdXAvNia3bKh77m7bUZj5wKFkt4jsp',3,1,2,'2026-08-30 11:47:52.141878','2026-08-30 11:47:52.141912',NULL,'41600000c1fb443aa8596e7b2791253e'),(4,'YAhOjjDrLBDncL4VxBv6z7CHobpNpl',4,1,2,'2026-08-30 11:50:34.079466','2026-08-30 11:50:34.079505',NULL,'a6a2604ce447478b9d4502a24e2201b8'),(5,'Z3Ywsk9Mvcp3hNHSb1oWQtuA3Kijz1',5,1,1,'2026-08-30 11:52:13.324592','2026-08-30 11:52:13.324613',NULL,'a1f4387ee9f3499fb3b76ba8eaee5054'),(6,'2TUN57H9FrccSL7padIR2yyCWimREE',6,1,2,'2026-08-30 11:52:36.741061','2026-08-30 11:52:36.741209',NULL,'7d264058b4c847f3939061e08cf213e6'),(7,'K4DZvBLJbIdGSfacSOI69rkimgwAJl',7,1,2,'2026-08-30 12:28:20.100758','2026-08-30 12:28:20.100790',NULL,'e9adb5d3a3b84e6b909da0855fee1ce8'),(8,'Khdcu4hMXyZMepwKkOO2DQEjSYxmkN',8,1,3,'2026-08-30 12:31:56.674205','2026-08-30 12:31:56.674227',NULL,'ec4b8e09cc034efc8945115a17795386'),(9,'jyVxm0VCdexMaB4nYhB0HeFNn9rjye',9,1,2,'2026-08-30 12:36:14.183756','2026-08-30 12:36:14.183780',NULL,'5cef299f8093475b942e9af0ac9502b4'),(10,'oDyrKAmZdBYmy3wVkWOjJX2EQibBdg',10,1,2,'2026-08-30 12:36:15.703082','2026-08-30 12:36:15.703100',NULL,'2ba1663eb0ae4214a7ea0c1549f6e7ee'),(11,'Z7MR8QNLnfxSyMc1FiURkj0mHU9cC1',11,1,2,'2026-08-30 12:39:34.475412','2026-08-30 12:39:34.475444',NULL,'4a2ad3bfac704ef3870fe155d13e4b01'),(12,'gQziZgKJvXzYa5kCTcNBXV1TNAKFnS',12,1,2,'2026-08-30 12:43:10.708538','2026-08-30 12:43:10.708560',NULL,'6389f1e3d8dc43c0a8d84f69d0ad24ec'),(13,'6UmnCde75HSpsVRmdo2CLGvgaBh53d',13,1,3,'2026-08-30 12:44:18.870419','2026-08-30 12:44:18.870437',NULL,'1c6a64a9ce514a46b58dbc22b7750c37'),(14,'shvvq01oQR2kARlZ3rg8gQioFmwIIT',14,1,3,'2026-08-30 12:44:54.928818','2026-08-30 12:44:54.928840',NULL,'122e65e7279c4ac580e50f7643add9db'),(15,'fQaSnKCMLnoJVg5Miei4FqiXbmiL90',15,1,3,'2026-08-30 12:44:56.434647','2026-08-30 12:44:56.434666',NULL,'43510e1b1d7c4841aa35b372355b226a'),(16,'33ihHTLMiteKFP2K3pXxKzusQHMy4B',16,1,2,'2026-08-30 13:00:30.152559','2026-08-30 13:00:30.152579',NULL,'09cf6576b8794c4796db5cedccc0a50d'),(17,'6VoWwx4poQMbm0HMEcG4gAZl5SZRbi',17,1,3,'2026-08-30 13:01:39.687616','2026-08-30 13:01:39.687635',NULL,'bc867039994d4e41926672818db77d75'),(18,'72KgKdnZD6Fx863ZuemHDm1sCthlLM',18,1,3,'2026-08-31 06:16:30.587672','2026-08-31 06:16:30.587705',NULL,'588b19d47aa74b1b810301aa353fa994'),(19,'zDFrC4U9PD02q9nz9IOFXKa8uBhr0q',19,1,3,'2026-08-31 06:16:33.041648','2026-08-31 06:16:33.041692',NULL,'9e23d0b8665b4fd883d05769c3712d4b'),(20,'XFZ9WaEW4eVTpwlJk0EKmFWhzIKh1J',20,1,3,'2026-08-31 06:16:35.781167','2026-08-31 06:16:35.781200',NULL,'09e2026be2eb4adda1d9764bceadc708'),(21,'3Hd7EXTnbxjzkQXXpofgexJBrVuYWf',21,1,2,'2026-08-31 06:19:30.631787','2026-08-31 06:19:30.631823',NULL,'280013b27f7c4af687bd0c56f8af23be'),(22,'PjQ8kk2u2FjokorNdwF3SDmjbjiMPa',22,1,3,'2026-08-31 06:22:58.863133','2026-08-31 06:22:58.863184',NULL,'3d759645b7c749d4849a22483bc8b58b'),(23,'Mu98rucc4ykuvmFI0Vk61jrCk0sUdo',23,1,3,'2026-08-31 06:23:01.734932','2026-08-31 06:23:01.734972',NULL,'c8af66bbf5054deb91b96bb8123c6810'),(24,'BHErUPzmnQifi90gLcJDdLAoiFu4vV',24,1,1,'2026-09-07 05:25:04.267348','2026-09-07 05:25:04.267378',NULL,'72fb0d75c24548b999b5fd6c5104307f'),(25,'ZU1MXi2HrStqI2ePZuExdS963IVuPE',25,1,1,'2026-09-07 10:32:22.332234','2026-09-07 10:32:22.332263',NULL,'3f7ce65f7436475ea0a6ea8f5943c6c8'),(26,'tAttKTmTqvVUZ59nn9bVPTbI7Ji8Cp',26,1,1,'2026-09-07 10:34:22.752083','2026-09-07 10:34:22.752113',NULL,'733fc09824874a4cbe135f7d872905da'),(27,'iEF8vaNt71rZXPrVZu657uA5QZce1D',27,1,1,'2026-09-07 10:34:56.965605','2026-09-07 10:34:56.965632',NULL,'54a469eda7654e69962da2cc2de3e792'),(28,'JyHW46c2dOrnIXYfzPOdXAnERblTjh',28,1,1,'2026-09-07 10:34:58.124494','2026-09-07 10:34:58.124518',NULL,'662130e5a44c4fb59462c9c281622c29'),(29,'i5p7qZL1AuMXciX8VIOSrPfX5sMby8',29,1,3,'2026-09-07 11:01:22.302225','2026-09-07 11:01:22.302258',NULL,'451151cd7e5546d7846183a5c5e854b8'),(30,'9F0i2J9xPXFp1aTzTNcrlyzS27SCvQ',30,1,1,'2026-09-07 11:09:06.587571','2026-09-07 11:09:06.587591',NULL,'8611a95619ea4f16a17d422ba4d56042'),(31,'nSnIqAXCTmZVpfZrum9fcN81syGgwZ',31,1,2,'2026-09-07 11:14:28.524600','2026-09-07 11:14:28.524627',NULL,'9a7b01df792249cdb25406be211a2d5b'),(32,'TJpjlFAdxgJHKhQyPDlBHnXRlHsifT',32,1,3,'2026-09-07 11:15:18.360802','2026-09-07 11:15:18.360824',NULL,'593fb9ded7754fbeb6b6362f85c47a3e'),(33,'5FSRbA6tEB66P7kosbDBJoxFQxIPep',33,1,3,'2026-09-08 04:37:13.801353','2026-09-08 04:37:13.801387',NULL,'237a70f6d36143d4bcc7aafd28f1335d'),(34,'embOIeiYfGueGlkFmVkyCFA6y1nVl8',34,1,3,'2026-09-08 04:37:16.764477','2026-09-08 04:37:16.764512',NULL,'10c0dded318b4e789a97a737a55cc83f'),(35,'kCiQBdvJ2n57oR5JmHVXUaaUv9rMtQ',35,1,3,'2026-09-08 05:39:56.180469','2026-09-08 05:39:56.180489',NULL,'21f04bb1cc904a29a574c61f3e81090c'),(36,'J9Ks4Fyni6Fntjtp3sipnKz2313IyE',36,1,2,'2026-09-08 06:00:31.046343','2026-09-08 06:00:31.046363',NULL,'0eabaeca1a2146ff91b6005f4accad29'),(37,'SKaRbwUJJ058D5NEroJja76Ipaty9G',37,1,1,'2026-09-08 06:24:27.296652','2026-09-08 06:24:27.296671',NULL,'2be4a020bbbe4f9ca74ae5cf48f16af1'),(38,'Hx4sEz33aPUbKMJOQZPrm74CYMOuFO',38,1,3,'2026-09-08 09:57:54.168999','2026-09-08 09:57:54.169016',NULL,'b555ee605ae44d818ed9c92b67a3d86b'),(39,'IeR7f6QI1v9yQXetSs7BQzpxgE5VSD',39,1,3,'2026-09-09 03:43:08.480244','2026-09-09 03:43:08.480273',NULL,'7ee48de71abb4fd5a77e581e1ae9404f'),(40,'gZSyaKkzRIHnRLujIaBtCLqGnmF2Db',40,1,3,'2026-09-09 03:54:25.458701','2026-09-09 03:54:25.458731',NULL,'248c5ebdcf59407ab86af10da3d3e2e1'),(41,'W3OkImRXvdGElGAtjXvui8cFoJORZQ',41,1,3,'2026-09-09 03:54:32.369054','2026-09-09 03:54:32.369088',NULL,'8daeb6fb291d4567983b64f1cfa4d42f'),(42,'Jh8C4YbsrUKpEFzMYEHR6aSZWz5XNx',42,1,1,'2026-09-09 04:20:01.709102','2026-09-09 04:20:01.709140',NULL,'9ab1e40b8b1a4a87a506d167e08fc160'),(43,'XKAEL6ucYYc7lFtNX0jpKdNDVhx4mZ',43,1,1,'2026-09-09 04:20:03.571695','2026-09-09 04:20:03.571729',NULL,'d5a547212f3d4300a4f5dcc2108f7426'),(44,'NEMumcC8iM5ZtJ3Vx8bDdwKhfSGI3W',44,1,1,'2026-09-09 04:20:09.713502','2026-09-09 04:20:09.713538',NULL,'b3ab4057ca994a5491a3aacd9e0559a0'),(45,'CTzPPKTAQMWx28GXZSC0NJCuRE0nk1',45,1,2,'2026-09-09 04:31:05.204365','2026-09-09 04:31:05.204400',NULL,'6f7af3b064714ba0aad13037ac97f91f');
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-13 16:10:02
