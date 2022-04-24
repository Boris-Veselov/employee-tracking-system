USE tracking;

INSERT INTO department(name)
VALUES
('Legal'),
('Medical'),
('Human resources'),
('Hacking');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Legal Director', 125000, 1),
  ('Lead physician', 75000, 2),
  ('HR Director', 90000, 3),
  ('The Hacker', 101000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Bob', 'Bibbins', 1, 5),
  ('Rob', 'Robbins', 2, 5),
  ('Todd', 'Toddins', 1, 5),
  ('Fred', 'Freddins', 2, 5),
  ('Greg', 'Greggins', 1, 5),
  ('Tedd', 'Teddins', 2, 10),
  ('Redd', 'Reddins', 1, 10),
  ('Bill', 'Billers', 2, 10),
  ('Nill', 'Nillers', 1, 10),
  ('Phill', 'Phillers', 2, 10);


