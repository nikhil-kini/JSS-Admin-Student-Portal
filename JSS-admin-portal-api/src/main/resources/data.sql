-- Delete only specific records if needed
DELETE FROM personaldocument WHERE user_id IN (SELECT id FROM users WHERE role='Admin' AND email LIKE 'oldadmin@%');
DELETE FROM documents WHERE user_id IN (SELECT id FROM users WHERE role='Admin' AND email LIKE 'oldadmin@%');
DELETE FROM users WHERE role='Admin' AND email LIKE 'oldadmin@%';

-- Insert new Admin users only if they don't already exist
INSERT INTO users (id, email, password, role)
SELECT 1, 'admin@example.com', 'YWRtaW4xMjM=', 'Admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com');

INSERT INTO users (id, email, password, role)
SELECT 2, 'admin2@example.com', 'YWRtaW4xMjM=', 'Admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin2@example.com');

