CREATE USER 'username'@'localhost' IDENTIFIED BY 'pasword';
GRANT ALL PRIVILEGES ON `databasename`.* TO 'myusername'@'localhost';
FLUSH PRIVILEGES;