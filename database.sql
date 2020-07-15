-- USERS --
CREATE TABLE "user"
(
    "id" serial PRIMARY KEY,
    "username" varchar (255) UNIQUE NOT NULL,
    "display" varchar,
    "password" varchar NOT NULL,
    "email" varchar,
    "phone" varchar,
    "picture" varchar DEFAULT '/images/No_Avatar.png',
    "access_level" INT DEFAULT 0
);

CREATE TABLE "feed"
(
	"id" serial PRIMARY KEY,
	"user_id" INT,
	"date" TIMESTAMP DEFAULT NOW(),
	"comment" varchar (500),
	"upvotes" INT DEFAULT 0,
	FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

CREATE TABLE "weight"
(
	"id" serial PRIMARY KEY,
	"user_id" INT,
	"date" TIMESTAMP DEFAULT NOW(),
	"weight" NUMERIC,
	"private" BOOLEAN DEFAULT TRUE,
	FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

INSERT INTO "public"."user"("username","password","email","phone","picture","access_level")
VALUES
(E'Tan',E'$2a$10$EaKrcSLMl.D9TAddZ0dEb.ndSxpLW8raGFyZDQPdBs6lCKKiYqBlW',E'truefoe@gmail.com',E'612-501-3800',E'/images/Tan.jpg',1),
(E'Linda',E'$2a$10$cj9Khb3SSXOdtXCoF2FNRO72Wm4sBKQ6ifIy7OcLJjT9lnILQK6W6',E'lindaah07@gmail.com',E'612-100-1000',E'/images/Linda.png',0),
(E'Vi',E'$2a$10$6GrWdSWXhfaWp9ivONIo6O0q7dtYcdZsaKzYVNAUm5ESI2q7YT44W',NULL,E'7023513692',E'/images/Vi.png',0),
(E'Peter',E'$2a$10$HvanRKSoPr9cBvcfJAaBxus422gOKFh3ciJ8dEWJHvOGHdGqe.pQS',NULL,E'9522015734',E'/images/Peter.png',0),
(E'Charizzo',E'$2a$10$Y3oELa6wkxQAXybAX5eB5.24D3SeSSDnqAaw8xyEwN836p/99mn4m',NULL,E'6122328646',E'/images/Charly.png',0),
(E'Sonny',E'$2a$10$rz5NZIMISy7VRKLfgTgqI.Vk4frnX4KsLaehtb716XYNt9oXTQTMO',NULL,E'6134088709',E'',0),
(E'Phuong',E'$2a$10$T.wQY3lYYVFeDm0KH67nkejXDxCX1EwtUyIrR39zTvCaU/8UwKcJe',NULL,E'+16127016892',E'/images/Phuong.png',0),
(E'Trucpotle',E'$2a$10$qiS5VRaaLK1MPgfERJxN8e4vjEO2lYnlIIHf35ych/itYokadU4wa',NULL,E'7147285640',E'/images/Truc.png',0),
(E'STVNSN',E'$2a$10$464s2TYsUtb1fhBdb3YbLeIHTk5tLxKb81Ddz7qiXghxPoxjjdP96',NULL,E'6126662736',E'/images/Steven.png',0),
(E'Ivan',E'$2a$10$qZh1brvEFIK.gbABd5Dk4uyW1Rwgjng44Glr33nYIGoxjWHNUACBe',NULL,E'7147285585',E'https://scontent-msp1-1.xx.fbcdn.net/v/t1.15752-9/109736015_562845941062328_1269366549481417009_n.jpg?_nc_cat=102&_nc_sid=b96e70&_nc_ohc=PX2SeKc3zIUAX81Z546&_nc_ht=scontent-msp1-1.xx&oh=2fdd74cfe626188f2599000a759dca23&oe=5F33CFBF',0);

INSERT INTO "public"."weight"("user_id","date","weight","private")
VALUES
(1,E'2020-07-12 23:41:00',195.4,FALSE),
(1,E'2020-07-14 21:21:00',194.6,FALSE),
(2,E'2020-07-12 23:48:51',182.6,FALSE),
(2,E'2020-07-14 19:52:00',179,FALSE),
(3,E'2020-07-14 19:46:50.857',167,FALSE),
(4,E'2020-07-12 23:48:52',184.4,FALSE),
(5,E'2020-07-13 07:29:00',280.6,FALSE),
(7,E'2020-07-15 00:42:00',217.2,TRUE),
(8,E'2020-07-14 20:13:54.904',160,FALSE),
(10,E'2020-07-11 23:56:00',255.7,FALSE);

INSERT INTO "public"."feed"("user_id","date","comment","upvotes")
VALUES
(1,E'2020-07-14 13:37:44.766892',E'I went for a jog and then it started pouring!',13),
(2,E'2020-07-14 11:15:43.766892',E'I just did 100 squats.  Crushed it!',12),
(3,E'2020-07-15 00:45:11.078238',E'Viiiii in the houseeee',13),
(4,E'2020-07-15 00:48:39.979276',E'I said what what',38),
(2,E'2020-07-15 00:52:32.639018',E'One hour work out with some boxing!! ',11),
(4,E'2020-07-15 00:52:41.533611',E'Just got home from a 20+mile bike ride Woowoo ',11),
(8,E'2020-07-15 01:05:51.497878',E'I also got home from a bike ride too!!',11),
(7,E'2020-07-15 03:26:54.358745',E'Lol...you can ❤️ multiple times. Good job y\'all!',4),
(10,E'2020-07-15 03:52:32.522614',E'Went to the gym then played basketball with my homies, kinda paralyzed doe',31),
(5,E'2020-07-15 03:58:13.610776',E'Just did a Chloe Ting workout with Callie.. now sore',10),
(3,E'2020-07-15 07:25:38.962523',E'Hahaha nice short name peter ',2),
(4,E'2020-07-15 14:07:20.371719',E'Tanks Vi',6);