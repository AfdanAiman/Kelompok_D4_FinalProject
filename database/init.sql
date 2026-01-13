CREATE DATABASE IF NOT EXISTS ta_db;
USE ta_db;

CREATE TABLE IF NOT EXISTS menfess (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO menfess (content) VALUES
('Halo, ini menfess pertama'),
('Docker akhirnya jalan'),
('Tekser D paling solid');
