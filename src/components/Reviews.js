import { AiOutlineConsoleSql, AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";

import StarReview from "./StarReview";
import ReviewsStats from "./ReviewsStats";
import ReviewForm from "./ReviewForm";
import EditForm from "./EditForm";
import Toggleable from "./Toggleable";
import studentServices from "../services/students";
import courseServices from "../services/courses";

const Review = ({ review, handleUpdate, handleDelete }) => {
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);
  const [newReviewText, setReview] = useState(review.review);
  const [newDifficulty, setDifficulty] = useState(review.difficulty);
  const [newWorkload, setWorkload] = useState(review.workload);
  const [newTeaching, setTeaching] = useState(review.teaching);
  const [clicked, setClicked] = useState(false);
  const [studentID, setStudentID] = useState("");
  const [studentList, setStudents] = useState([]);

  useEffect(() => {
    studentServices.getStudents().then((response) => setStudents(response));
  }, []);

  const handleLike = async () => {
    if (!clicked) {
      setLikes(likes + 1);
      setClicked(true);
      handleUpdate(review.id, {
        ...review,
        likes: likes + 1,
      });
    }
  };

  const handleDislike = async (event) => {
    event.preventDefault();
    if (!clicked) {
      setDislikes(dislikes + 1);
      setClicked(true);
      handleUpdate(review.id, {
        ...review,
        dislikes: dislikes + 1,
      });
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    handleUpdate(review.id, {
      ...review,
      review: newReviewText,
      difficulty: newDifficulty,
      workload: newWorkload,
      teaching: newTeaching,
    });
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this review?"))
      handleDelete(review.id);
  };

  const Verified = () => {
    if (studentList.map((student) => student.id).includes(review.student_id)) {
      return (
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/768px-Twitter_Verified_Badge.svg.png"
            style={{ height: '20px' }}
          />
        </div>
      );
    } else {
      return (
        <div style={{ height: '20px' }}>
        </div>
      );
    }
  };

  return (
    <div className="review">
      <div>
        <div className="stars-and-verified">
          <StarReview starValue={(review.difficulty + review.workload + review.teaching) / 3} starSize={17} starstyle={{ marginRight: 1, cursor: "pointer" }} />
          <Verified />
        </div>
        <div className="review-text-stars">
          <div className="review-text">{review.review}</div>
          <div className="star-ratings">
            <div>
              <StarReview starValue={review.difficulty} /> Difficulty
            </div>
            <div>
              <StarReview starValue={review.workload} /> Workload
            </div>
            <div>
              <StarReview starValue={review.teaching} /> Teaching
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button className="general-btn" onClick={handleLike}>
          <AiOutlineLike />
          {likes}
        </button>
        <button className="general-btn" onClick={handleDislike}>
          <AiOutlineDislike />
          {dislikes}
        </button>
        <input
          className="student-id-input"
          placeholder="Student ID to Edit/Delete"
          value={studentID}
          onChange={({ target }) => setStudentID(target.value)}
        />
      </div>
      {Number(studentID) === review.student_id ? (
        <EditForm
          handleEdit={handleEdit}
          handleRemove={handleRemove}
          setReview={setReview}
          setDifficulty={setDifficulty}
          setWorkload={setWorkload}
          setTeaching={setTeaching}
          newDifficulty={newDifficulty}
          newWorkload={newWorkload}
          newTeaching={newTeaching}
          text={newReviewText}
        />
      ) : null}
    </div>
  );
};



const Reviews = ({ code, reviews, handleAdd, handleUpdate, handleDelete }) => {
  const reviewFormRef = useRef();
  const [studentList, setStudents] = useState([]);
  const [courses, setCourses] = useState();
  var courseName = null;
  var verifiedReviews = [];
  var nonVerifiedReviews = [];

  useEffect(() => {
    studentServices.getStudents().then((response) => setStudents(response));
  }, []);

  useEffect(() => {
    courseServices.getCourses().then((response) => setCourses(response));
  }, []);

  if (courses !== undefined) {
    const courseFound = courses.find(x => x.code === code);
    if (courseFound !== undefined)
      courseName = courseFound.name.en;
  }

  if (reviews !== null) {
    verifiedReviews = reviews.filter(review => studentList.map(student => student.id).includes(review.student_id))
    nonVerifiedReviews = reviews.filter(review => !studentList.map(student => student.id).includes(review.student_id))
  }


  if (reviews === null) {
    return <p>select a course from the list</p>;
  } else if (reviews.length < 1) {
    return (
      <div className="reviews">
        <h1 className="course-name">{code + " - " + courseName}</h1>
        <p>no reviews found</p>
        <ReviewsStats reviews={reviews} />
        <Toggleable buttonLabel="Write a review" ref={reviewFormRef}>
          <ReviewForm
            handleAdd={handleAdd}
            toggle={reviewFormRef}
            code={code}
          />
        </Toggleable>
        <hr />
      </div>
    );
  } else
    return (
      <div className="reviews">
        <h1 className="course-name">{code + " - " + courseName}</h1>
        <ReviewsStats reviews={reviews} />
        <Toggleable buttonLabel="Write a review" ref={reviewFormRef}>
          <ReviewForm
            handleAdd={handleAdd}
            code={code}
            toggle={reviewFormRef}
          />
        </Toggleable>
        <hr />
        <div>
          {verifiedReviews
            .sort((a, b) => b.likes - a.likes)
            .map((review) => (
              <Review review={review} key={review.id} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            ))}
          {nonVerifiedReviews
            .sort((a, b) => b.likes - a.likes)
            .map((review) => (
              <Review review={review} key={review.id} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            ))}
        </div>
      </div>
    );
};

export default Reviews;
