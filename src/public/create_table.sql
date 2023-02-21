CREATE TABLE urls (
  id INT(11) NOT NULL AUTO_INCREMENT,
  long_url VARCHAR(255) NOT NULL,
  short_id VARCHAR(20) NOT NULL,
  clicks INT(11) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY short_id (short_id)
);
