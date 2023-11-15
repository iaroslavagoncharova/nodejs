DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO Users 
    VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users 
    VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', '', 305, 'image/jpeg', null);

  INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink 2', null, 305, 'image/jpeg', null),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 260, 'image/jpeg', null),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg', null);

select filename, title, username from MediaItems, Users where users.user_id=MediaItems.user_id;
-- inner join
select filename, title, username, MediaItems.created_at AS UPLOADED
  from MediaItems
  JOIN users ON users.user_id=MediaItems.user_id;
-- right join
select filename, title, username, MediaItems.created_at AS UPLOADED
  from MediaItems
  RIGHT JOIN users ON users.user_id=MediaItems.user_id;



CREATE TABLE Profiles (
    profile_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    phone_number VARCHAR (20) NOT NULL,
    birthdate DATE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (profile_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
)

CREATE TABLE Posts (
    post_id INT NOT NULL AUTO_INCREMENT,
    media_id INT NOT NULL,
    privacy VARCHAR (7) NOT NULL,
    caption VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id)
)

INSERT INTO Profiles (user_id, phone_number, birthdate)
VALUES (305, '010-000-0000', '2023-11-08'),
       (260, '020-000-0000', '2023-11-07'),
       (305, '011-111-1111', '2023-11-08'),
       (260, '022-222-2222', '2023-11-07');

INSERT INTO Posts (media_id, privacy, caption)
VALUES (4, 'public', 'This is my favorite hot chocolate!'),
       (7, 'private', 'Hanging out with friends');

SELECT * FROM Posts WHERE media_id = 4;
SELECT * FROM Profiles WHERE user_id = 260;
UPDATE Posts SET privacy = 'private' WHERE post_id = 1;
DELETE FROM Posts WHERE media_id = 4;
