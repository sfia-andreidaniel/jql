CREATE DATABASE jql;

CREATE TABLE jql_forms_config (

  user_id               INT NOT NULL,
  form_id               INT NOT NULL,

  config                LONGBLOB,

  PRIMARY KEY (form_id, user_id)

) ENGINE = INNODB, CHARSET = UTF8;

CREATE TABLE jql_form_allowed_queries (

  form_id                INT NOT NULL,
  query_md5_hash         CHAR(32),

  PRIMARY KEY( form_id, query_md5_hash ),

  CONSTRAINT FK_jql_form_allowed_queries_jql_forms_config FOREIGN KEY (form_id )
  REFERENCES jql_forms_config(form_id) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE = INNODB, CHARSET = UTF8;

CREATE TABLE jql_tables (

  id                     INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

  user_id                INT NOT NULL,
  form_id                INT,
  name CHAR(64)          NOT NULL,
  created_date           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  access_mode            ENUM( 'READ', 'WRITE', 'READ_WRITE' ),
  storage_engine_type    ENUM( 'in-memory', 'backend' ),

  UNIQUE KEY( form_id, name ),

  CONSTRAINT FK_jql_tables_jql_forms_config_form_id FOREIGN KEY ( form_id, user_id )
  REFERENCES jql_forms_config(form_id, user_id) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE = INNODB, CHARSET utf8;
