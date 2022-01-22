CREATE DATABASE "template"
    WITH 
    OWNER = pg_database_owner
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE "template"
    IS 'This is an opinionated template rest api database';
