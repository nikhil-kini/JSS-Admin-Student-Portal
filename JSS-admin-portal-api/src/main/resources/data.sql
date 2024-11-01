--DELETE FROM USERS WHERE role='Admin';
--
--INSERT INTO users (email, password, role)
--VALUES ('admin@example.com', 'YWRtaW4xMjM=', 'Admin'),
--('admin2@example.com', 'YWRtaW4xMjM=', 'Admin');


DELETE FROM USERS WHERE role='Admin';

INSERT INTO users (id, email, password, role)
VALUES
(1, 'admin@example.com', 'YWRtaW4xMjM=', 'Admin'),
(2, 'admin2@example.com', 'YWRtaW4xMjM=', 'Admin');