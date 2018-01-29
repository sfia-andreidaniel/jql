CREATE DATABASE jql;

CREATE TABLE jql_forms_config (

  user_id               INT NOT NULL,
  form_id               INT NOT NULL,

  config                LONGBLOB,

  PRIMARY KEY (form_id, user_id)

) ENGINE = INNODB, CHARSET = UTF8;

CREATE TABLE jql_form_allowed_queries (

  user_id                INT NOT NULL,
  form_id                INT NOT NULL,

  query_md5_hash         CHAR(32),

  PRIMARY KEY( user_id, form_id, query_md5_hash ),

  CONSTRAINT FK_jql_form_allowed_queries_jql_forms_config FOREIGN KEY (form_id, user_id )
  REFERENCES jql_forms_config(form_id, user_id) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE = INNODB, CHARSET = UTF8;

CREATE TABLE jql_tables (

  id                     INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

  user_id                INT NOT NULL,
  form_id                INT,
  name CHAR(64)          NOT NULL,
  created_date           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  access_mode            ENUM( 'r', 'w', 'rw' ),
  storage_engine         ENUM( 'memory', 'remote' ),

  json_schema            MEDIUMBLOB,
  json_indexes           MEDIUMBLOB,

  UNIQUE KEY( form_id, name ),
  KEY( user_id, form_id )

) ENGINE = INNODB, CHARSET utf8;

