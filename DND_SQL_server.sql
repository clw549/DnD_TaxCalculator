


create database if not exists DND_TAX_DB;

use DND_TAX_DB;

drop table if exists Player;
create table if not exists Player(
p_name VARCHAR(255),
p_password VARCHAR(255),
p_id INT UNIQUE,
PRIMARY KEY (p_name, p_password)
);

drop table if exists Playable_character;
create table if not exists Playable_character(
c_name VARCHAR(255),
gold INT,
silver INT,
copper INT,
married VARCHAR(1),
player_id INT,
FOREIGN KEY (player_id) REFERENCES Player(p_id)
);

insert into Player value ("Ciaran", "Gertrude", 1);
insert into Playable_character value ("Gertrude Rolin", 20, 2, 5, 'n', 1);

SELECT * FROM Player;
SELECT * FROM Playable_character;
SELECT p.p_name, c.c_name FROM Player p JOIN (SELECT * FROM Playable_character) c ON p.p_id = c.player_id;

create user if not exists "server_operator"@"DND_TAX_DB" identified by 'rXKE;{WC6dk*2:tjm=8#VQ';
