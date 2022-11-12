CREATE TABLE reviews(
	id INT,
	student_id INT,
	review VARCHAR(255),
	likes INT,
	dislikes INT,
  course_id VARCHAR(255),
	difficuly INT,
	workload INT,
	teaching INT,
  	PRIMARY KEY(id)
);

CREATE TABLE students(
	student_id INT,
	name VARCHAR(255),
  	PRIMARY KEY(student_id)
);


CREATE TABLE verified_ids(
	id INT,
  	PRIMARY KEY(id)
);