drop table if exists Player;
create table if not exists Player(
p_id INT NOT NULL AUTO_INCREMENT,
p_name VARCHAR(255),
p_password VARCHAR(255),
PRIMARY KEY (p_id)
);

drop table if exists Playable_character;
create table if not exists Playable_character(
c_name VARCHAR(255),
player_id INT,
gold INT,
silver INT,
copper INT,
married VARCHAR(1),
PRIMARY KEY (c_name, player_id),
FOREIGN KEY (player_id) REFERENCES Player(p_id)
);