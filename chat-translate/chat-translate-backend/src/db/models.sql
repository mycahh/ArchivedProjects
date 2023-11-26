CREATE DATABASE IF NOT EXISTS 'chat-translante';

USE 'chat-translante';

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(12) UNIQUE NOT NULL,
    displayName VARCHAR(20),
    password VARCHAR(20) NOT NULL,
    photo_url VARCHAR(255),
    isPremium BOOLEAN NOT NULL,
);

CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS participants (
    id_room INT,
    id_user INT,
    id_lastest_messages INT,
    FOREIGN KEY (id_room) REFERENCES rooms(id),
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_lastest_messages) REFERENCES messages(id)
);

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT,
    created_at TIMESTAMP,
    id_user INT,
    id_room INT,
    id_idioma INT,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_room) REFERENCES rooms(id),
	FOREIGN KEY (id_idioma) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user_adding INT,
    id_user_added INT,
    id_room INT,
    FOREIGN KEY (id_user_adding) REFERENCES users(id),
    FOREIGN KEY (id_user_added) REFERENCES users(id),
    FOREIGN KEY (id_room) REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS Languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
)