CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes numeric DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) values ('Bob', 'bob.com', 'Story of my life', 3);
INSERT INTO blogs (author, url, title, likes) values ('Maria', 'maria.com', 'Cool books', 5);
