DELETE FROM USERS WHERE role='Admin';

INSERT INTO users (email, password, role)
VALUES ('admin@example.com', 'YWRtaW4xMjM=', 'Admin'),
('admin2@example.com', 'YWRtaW4xMjM=', 'Admin');