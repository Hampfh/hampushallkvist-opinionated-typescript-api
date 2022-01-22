CREATE TYPE public."TokenType" AS ENUM
    ('REFRESH');

ALTER TYPE public."TokenType"
    OWNER TO pg_database_owner;
