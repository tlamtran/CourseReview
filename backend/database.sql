CREATE TABLE reviews(
	id INT,
	student_id INT,
	review VARCHAR(255),
	likes INT,
	dislikes INT,
  course_id VARCHAR(255),
	difficulty INT,
	workload INT,
	teaching INT,
  	PRIMARY KEY(id)
);


CREATE TABLE verified_ids(
	id INT,
  	PRIMARY KEY(id)
);