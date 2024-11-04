DELETE FROM documents WHERE user_id IN (SELECT id FROM users WHERE role='Admin');

-- Now, delete Admin users
DELETE FROM users WHERE role='Admin';

-- Insert new Admin users
INSERT INTO users (id, email, password, role)
VALUES
(1, 'admin@example.com', 'YWRtaW4xMjM=', 'Admin'),
(2, 'admin2@example.com', 'YWRtaW4xMjM=', 'Admin');

--DELETE FROM USERS WHERE role='Admin';
--
--INSERT INTO users (id, email, password, role)
--VALUES
--(1, 'admin@example.com', 'YWRtaW4xMjM=', 'Admin'),
--(2, 'admin2@example.com', 'YWRtaW4xMjM=', 'Admin');