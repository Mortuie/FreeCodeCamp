CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE USER_STATUS AS ENUM ('admin', 'standard');

CREATE TABLE users (
    uuid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    fullname VARCHAR (100) NOT NULL,
    email TEXT NOT NULL,
    picture TEXT NOT NULL,
    city VARCHAR (100),
    country VARCHAR (100),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    github_id TEXT UNIQUE,
    local_id TEXT UNIQUE,
    password TEXT, 
    type_of_user USER_STATUS NOT NULL DEFAULT 'standard'
);

CREATE TABLE books (
    uuid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR (200) NOT NULL,
    picture TEXT NOT NULL DEFAULT 'https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png',
    user_uuid UUID NOT NULL REFERENCES users(uuid),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE trades (
    user_uuid UUID NOT NULL REFERENCES users(uuid),
    book_uuid UUID NOT NULL REFERENCES books(uuid),
    PRIMARY KEY (user_uuid, book_uuid),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);