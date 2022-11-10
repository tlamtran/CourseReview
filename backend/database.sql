CREATE TABLE reviews(
	review_id INT,
	student_id INT,
	review VARCHAR(255),
	likes INT,
	dislikes INT,
    course_id INT,
	difficuly INT,
	workload INT,
	teaching INT,
   PRIMARY KEY(review_id)
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