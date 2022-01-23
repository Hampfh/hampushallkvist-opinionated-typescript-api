-- Table: public.Tokens

-- DROP TABLE IF EXISTS public."Tokens";

CREATE TABLE IF NOT EXISTS public."Tokens"
(
    id SERIAL NOT NULL,
    token character varying(500) COLLATE pg_catalog."default" NOT NULL,
    expires timestamp without time zone NOT NULL,
    type "TokenType" NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "Tokens_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Tokens"
    OWNER to pg_database_owner;



-- SCHEMA: users

-- DROP SCHEMA IF EXISTS "users" ;

CREATE SCHEMA IF NOT EXISTS "users"
    AUTHORIZATION pg_database_owner;

-- Table: users.Users

-- DROP TABLE IF EXISTS "users"."Users";

CREATE TABLE IF NOT EXISTS "users"."Users"
(
    id SERIAL NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "name" character varying(50) COLLATE pg_catalog."default",
    surname character varying(50) COLLATE pg_catalog."default",
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "users"."Users"
    OWNER to pg_database_owner;

COMMENT ON TABLE "users"."Users"
    IS 'Table for storing core user data';

-- Table: users.Services

-- DROP TABLE IF EXISTS users."Services";

CREATE TABLE IF NOT EXISTS users."Services"
(
    id SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    service character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "serviceUsername" character varying(100) COLLATE pg_catalog."default",
    auth character varying(500) COLLATE pg_catalog."default" NOT NULL,
    verified BOOLEAN NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "Services_pkey" PRIMARY KEY (id),
    CONSTRAINT "userId" FOREIGN KEY ("userId")
        REFERENCES users."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS users."Services"
    OWNER to pg_database_owner;

COMMENT ON TABLE users."Services"
    IS 'Users authentication table for connecting Users table with third party login services';

COMMENT ON CONSTRAINT "userId" ON users."Services"
    IS 'Id of user table';

-- Table: users.UserTokens

-- DROP TABLE IF EXISTS "users"."UserTokens";

CREATE TABLE IF NOT EXISTS "users"."UserTokens"
(
    id SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "tokenId" FOREIGN KEY ("tokenId")
        REFERENCES public."Tokens" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "userId" FOREIGN KEY ("userId")
        REFERENCES "users"."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "users"."UserTokens"
    OWNER to pg_database_owner;
-- Index: fki_tokenId

-- DROP INDEX IF EXISTS "users"."fki_tokenId";

CREATE INDEX IF NOT EXISTS "fki_tokenId"
    ON "users"."UserTokens" USING btree
    ("tokenId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_userId

-- DROP INDEX IF EXISTS "users"."fki_userId";

CREATE INDEX IF NOT EXISTS "fki_userId"
    ON "users"."UserTokens" USING btree
    ("userId" ASC NULLS LAST)
    TABLESPACE pg_default;
