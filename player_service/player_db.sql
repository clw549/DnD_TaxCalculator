create table if not exists Player(
    p_id INT PRIMARY KEY,
    p_name VARCHAR(255) UNIQUE,
    p_password VARCHAR(255)
);