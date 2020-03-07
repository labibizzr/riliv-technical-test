/*
 Navicat Premium Data Transfer

 Source Server         : localhost-postgre
 Source Server Type    : PostgreSQL
 Source Server Version : 120002
 Source Host           : localhost:5432
 Source Catalog        : riliv-test
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120002
 File Encoding         : 65001

 Date: 07/03/2020 11:20:40
*/


-- ----------------------------
-- Sequence structure for pelanggan_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."pelanggan_id_seq";
CREATE SEQUENCE "public"."pelanggan_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for pesanan_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."pesanan_id_seq";
CREATE SEQUENCE "public"."pesanan_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for pelanggan
-- ----------------------------
DROP TABLE IF EXISTS "public"."pelanggan";
CREATE TABLE "public"."pelanggan" (
  "id" int4 NOT NULL DEFAULT nextval('pelanggan_id_seq'::regclass),
  "nama" varchar(200) COLLATE "pg_catalog"."default",
  "tanggal_daftar" date,
  "umur" int4,
  "no_hp" varchar(25) COLLATE "pg_catalog"."default",
  "createdAt" date,
  "deletedAt" date,
  "updatedAt" date
)
;

-- ----------------------------
-- Records of pelanggan
-- ----------------------------
INSERT INTO "public"."pelanggan" VALUES (3, 'update', '2020-03-06', 20, '03182828282', '2020-03-06', NULL, '2020-03-06');
INSERT INTO "public"."pelanggan" VALUES (4, 'update UPDATE', '2020-03-07', 20, '03182828282', '2020-03-07', NULL, '2020-03-07');
INSERT INTO "public"."pelanggan" VALUES (7, 'DELETE LABIBBBB', '2020-03-07', 20, '03182828282', '2020-03-07', NULL, '2020-03-07');
INSERT INTO "public"."pelanggan" VALUES (8, 'Test', '2020-03-07', 20, '0318292757', '2020-03-07', NULL, '2020-03-07');
INSERT INTO "public"."pelanggan" VALUES (9, 'Test', '2020-03-07', 20, '0318292757', '2020-03-07', NULL, '2020-03-07');

-- ----------------------------
-- Table structure for pesanan
-- ----------------------------
DROP TABLE IF EXISTS "public"."pesanan";
CREATE TABLE "public"."pesanan" (
  "id" int4 NOT NULL DEFAULT nextval('pesanan_id_seq'::regclass),
  "id_pelanggan" int4,
  "tanggal_pesanan" date,
  "total_harga" int8,
  "createdAt" date,
  "updatedAt" date,
  "deletedAt" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of pesanan
-- ----------------------------
INSERT INTO "public"."pesanan" VALUES (4, 4, '2020-12-30', 50000, '2020-03-07', '2020-03-07', NULL);
INSERT INTO "public"."pesanan" VALUES (5, 4, '2020-12-30', 69696969, '2020-03-07', '2020-03-07', NULL);
INSERT INTO "public"."pesanan" VALUES (6, 3, '2020-12-30', 100000, '2020-03-07', '2020-03-07', NULL);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."pelanggan_id_seq"
OWNED BY "public"."pelanggan"."id";
SELECT setval('"public"."pelanggan_id_seq"', 10, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."pesanan_id_seq"
OWNED BY "public"."pesanan"."id";
SELECT setval('"public"."pesanan_id_seq"', 7, true);

-- ----------------------------
-- Primary Key structure for table pelanggan
-- ----------------------------
ALTER TABLE "public"."pelanggan" ADD CONSTRAINT "pelanggan_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table pesanan
-- ----------------------------
ALTER TABLE "public"."pesanan" ADD CONSTRAINT "pesanan_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table pesanan
-- ----------------------------
ALTER TABLE "public"."pesanan" ADD CONSTRAINT "id_pelanggan" FOREIGN KEY ("id_pelanggan") REFERENCES "public"."pelanggan" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
