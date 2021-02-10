CREATE DATABASE pernquote;

CREATE TABLE quotes (
    quote_id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    tag TEXT NOT NULL
);

INSERT INTO quotes (quote, author, tag) VALUES ('The whole of science is nothing more than a refinement of everyday thinking.', 'Albert Einstein', 'science');
INSERT INTO quotes (quote, author, tag) VALUES ('Those who deny freedom to others deserve it not for themselves.', 'Abraham Lincoln', 'freedom');