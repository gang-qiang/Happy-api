/*
 Navicat Premium Data Transfer

 Source Server         : daily-mhc-o.mysql.rds.aliyuncs.com
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : daily-mhc-o.mysql.rds.aliyuncs.com:3306
 Source Schema         : project_net

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 14/01/2021 19:30:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for demand_product_relationships
-- ----------------------------
DROP TABLE IF EXISTS `demand_product_relationships`;
CREATE TABLE `demand_product_relationships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `demand_id` int(11) NOT NULL COMMENT '需求ID',
  `product_id` int(11) NOT NULL COMMENT '前端项目ID',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`demand_id`,`product_id`),
  UNIQUE KEY `id` (`id`),
  KEY `demand_id` (`demand_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `demand_product_relationships_ibfk_1` FOREIGN KEY (`demand_id`) REFERENCES `demands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `demand_product_relationships_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for demand_user_relationships
-- ----------------------------
DROP TABLE IF EXISTS `demand_user_relationships`;
CREATE TABLE `demand_user_relationships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `demand_id` int(11) NOT NULL COMMENT '需求ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`demand_id`,`user_id`),
  UNIQUE KEY `id` (`id`),
  KEY `demand_id` (`demand_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `demand_user_relationships_ibfk_1` FOREIGN KEY (`demand_id`) REFERENCES `demands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `demand_user_relationships_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for demands
-- ----------------------------
DROP TABLE IF EXISTS `demands`;
CREATE TABLE `demands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '需求名称',
  `description` text COMMENT '描述',
  `PRD_url` text COMMENT 'prd文档地址',
  `JIRA_url` text COMMENT 'JIRA文档地址',
  `UI_url` text COMMENT 'UI涉及文档地址',
  `API_url` text COMMENT '接口文档地址',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for end_front_relationships
-- ----------------------------
DROP TABLE IF EXISTS `end_front_relationships`;
CREATE TABLE `end_front_relationships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `front_id` int(11) NOT NULL COMMENT '前端项目ID',
  `end_id` int(11) NOT NULL COMMENT '后端项目ID',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`front_id`,`end_id`),
  UNIQUE KEY `id` (`id`),
  KEY `front_id` (`front_id`),
  KEY `end_id` (`end_id`),
  CONSTRAINT `end_front_relationships_ibfk_1` FOREIGN KEY (`front_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `end_front_relationships_ibfk_2` FOREIGN KEY (`end_id`) REFERENCES `end_products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for end_products
-- ----------------------------
DROP TABLE IF EXISTS `end_products`;
CREATE TABLE `end_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '产品/应用名称',
  `alias` varchar(32) DEFAULT NULL COMMENT '别名',
  `description` text COMMENT '描述',
  `owner_name` varchar(64) DEFAULT NULL COMMENT '所有人姓名',
  `owner_id` int(11) DEFAULT NULL COMMENT '所有人ID',
  `git_url` text COMMENT 'git地址',
  `online_url` text COMMENT '线上地址',
  `pre_url` text COMMENT '预发地址',
  `test_url` text COMMENT '测试地址',
  `is_jenkins` int(11) DEFAULT '1' COMMENT '是否通过jenkins部署: 1: 是; 2: 否;',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '产品/应用名称',
  `alias` varchar(32) DEFAULT NULL COMMENT '别名',
  `description` text COMMENT '描述',
  `level_config` varchar(128) DEFAULT NULL COMMENT '错误登记配置',
  `git_url` text COMMENT 'git地址',
  `tec_type` int(11) DEFAULT '1' COMMENT '技术栈: 1: react; 2: vue; 3: express; 4: koa; 5: jquery',
  `online_url` text COMMENT '线上地址',
  `pre_url` text COMMENT '预发地址',
  `test_url` text COMMENT '测试地址',
  `app_type` int(11) DEFAULT '1' COMMENT '应用类型: 1: 移动端应用; 2: 钉钉微应用; 3: 中台应用; 4: 小程序; 5: 二方包; 6: node 服务',
  `app_group` int(11) DEFAULT '1' COMMENT '所属应用组: 1: faw; 2: brood;',
  `is_jenkins` int(11) DEFAULT '1' COMMENT '是否通过jenkins部署: 1: 是; 2: 否;',
  `node_version` varchar(8) DEFAULT NULL COMMENT 'node版本',
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) DEFAULT NULL,
  `password` text,
  `description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;





INSERT INTO `project_net`.`users` (`username`, `password`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES ( '金果', '$2a$10$dLN16HEWggdAxkpDG1yKqexQgH.b0tj49t5FPwb8Pj6Sf..NSQuB.', '大佬', '2020-11-20 11:34:04', '2020-11-20 11:34:04', NULL),
( '寰宇', '$2a$10$bVNwyBv92qS6lMHaRp8QmuiCy.L3Z8CbBtWeSbvkg..n7eBzMuvgO', '大佬', '2020-11-20 11:33:05', '2020-11-20 11:33:05', NULL),
( '剑豪', '$2a$10$RSuUxcD0Hpn6Ri2J07oCS.C9Yjv/03hb.gXUD7o/XtHIieosF98/i', '大佬', '2020-11-20 11:33:21', '2020-11-20 11:33:21', NULL),
( '子明', '$2a$10$u8TxScwpfCIh9Uv6mQs.re8rLYI74R7TQ952hEjTwps5OCPiwe7s.', '大佬', '2020-11-20 11:33:37', '2020-11-20 11:33:37', NULL),
( '胡高珲', '$2a$10$3Q6PuP4Y4q1U2xByE7KtMuamiQ6CJYIDk/SiTvpa.71/Sb6hfsBLa', '大佬', '2020-11-20 11:29:37', '2020-11-20 11:29:37', NULL),
( '汪刚强', '$2a$10$Lyb9SYy69HaqrFJSuTMftOWnmC8wtaiOCFSr4V1sK0n0X87q8GcLi', '大佬', '2020-11-20 11:15:51', '2020-11-20 11:15:51', NULL),
( '张徐俊', '$2a$10$mKFruyp./au43TnybOxt2OLAhaJHemm0wK7ZfsvZ0mRtz.C3y9op.', '大佬', '2020-11-20 11:30:00', '2020-11-20 11:30:00', NULL),
( '罗齐铭', '$2a$10$Ludf0mq1rrcAwfGHGxAW3O/mTYkmCPqmSQb1o/DS71PP9SA0xBgxe', '大佬', '2020-11-20 11:29:21', '2020-11-20 11:29:21', NULL);

INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 'mainSite', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 'dodge-fe', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 6, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, 'malibu', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (4, 'ele-desktop', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (5, 'zt', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (6, 'shanshan', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (7, 'lianlianPay', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 2, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (8, 'alchemist-pc', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 6, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (9, 'nginx_admin', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (10, 'fe-lite', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (11, 'awesome', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (12, 'ds-fe', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 6, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (13, 'escrow', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 6, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (14, 'alchemist', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 6, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (15, '领航员', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (16, 'Luigi', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (17, 'jazz', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 8, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (18, 'Megatron', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (19, 'Ironhide', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 8, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (20, 'cybertron', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (21, 'dayu-app', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (22, 'dayu-admin', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (23, 'mclaren-fe', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (24, 'koenigsegg-fe', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (25, 'kruskal', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (26, 'prim', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (27, 'kunkka', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 3, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (28, 'Razor', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 6, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (29, 'Marowak', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (30, 'Solosis', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (31, 'rz-morphling', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (32, 'logicCom', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (33, 'Abaddon', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (34, 'rz-base', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (35, 'rz-druid', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (36, 'puck', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (37, 'HuskarPC', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (38, 'Huskar', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (39, 'Wisp', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (40, 'tida-fe', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (41, 'Brood', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (42, 'Furion', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 3, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (43, 'Druid', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 3, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (44, 'Gyrocopter', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 3, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (45, 'invoker', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 3, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (46, 'bounty-hunter', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 3, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (47, 'Enchantress', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 6, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (48, 'Zeus', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (49, 'Meepo', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (50, 'Oracle', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (51, 'Spectre', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (52, 'Morphling', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (53, 'Mirana', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (54, 'Earthshaker', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (55, 'Waymo', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (56, 'loanOrder', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (57, 'orderCenter', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (58, 'fabric', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (59, 'mew-api', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 8, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (60, 'cookieExtension', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 3, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (61, 'playstation', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 3, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (62, 'Thresh', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 3, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (63, 'mew', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (64, 'sass-components', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (65, 'MHCHelper', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (66, 'qinniu-tools', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (67, 'cdn', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (68, 'mhc-api-collection', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (69, 'now-cli', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (70, 'vue-cli', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (71, 'taric', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (72, 'MUX', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (73, 'eevee', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (74, 'pipe', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (75, 'Lickitung', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (76, '水印', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (77, 'ditto', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (78, 'bb8', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (79, 'template-server', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (80, 'muu-jquery', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 6, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (81, 'kaihaoche_web', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (82, 'Yoshino', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (83, 'Zadkiel', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (84, 'netcall', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (85, 'fe-readme', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (86, 'paymentCenter', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 2, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (87, 'byd', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (88, 'wing', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (89, '飞行检查', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (90, 'carCenter', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (91, 'hello', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (92, 'boot', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (93, '开发资源中心', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (94, 'tesla-fe', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (95, 'mhc-h5-docker', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (96, 'Ghost', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (97, 'faw-liberate', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (98, 'fiat-fe', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 1, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (99, 'kratos', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (100, 'accelgor', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (101, 'hive', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (102, 'Saber', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (103, 'CheckCarAgain', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (104, 'Egoist', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (105, 'Kaidou', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (106, 'Akame', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 5, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (107, 'lucario', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (108, 'Raboot', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (109, 'raichu', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (110, 'convertible', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (111, 'Scorbunny', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (112, 'wobbuffet', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (113, 'Togepi', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (114, 'origami', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (115, 'Persian', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (116, 'methratton', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (117, 'Meowth', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (118, 'mum-components', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (119, 'Grookey', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (120, 'kissum', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (121, 'tacitus', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (122, 'wheelbarrow', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (123, 'Smoochum', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (124, 'psyduckclient', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (125, 'Golduck', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (126, 'Psyduck', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (127, 'nami', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (128, 'Squirtle', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (129, 'car-spirit', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (130, 'crm-antd', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (131, 'smith', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (132, 'Aamir', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (133, 'Gourgeist', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (134, 'Lugia', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (135, 'Bulbasaur', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (136, 'koffing', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
INSERT INTO `project_net`.`products`(`id`, `name`, `alias`, `description`, `level_config`, `git_url`, `tec_type`, `online_url`, `pre_url`, `test_url`, `app_type`, `app_group`, `is_jenkins`, `node_version`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (137, 'Pikachu', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, 4, '2021-01-14 19:27:15', '2021-01-14 19:27:15', NULL);
