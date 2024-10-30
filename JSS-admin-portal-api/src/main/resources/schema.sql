CREATE TABLE IF NOT EXISTS USERS (
    id  PRIMARY KEY,                -- Auto-incrementing ID
    email VARCHAR(100) NOT NULL UNIQUE,   -- User email, must be unique
    password VARCHAR(100) NOT NULL,       -- Password field
    role VARCHAR(50) NOT NULL              -- User role (e.g., Admin, User)
);