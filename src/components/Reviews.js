import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";

import StarReview from "./StarReview";
import ReviewsStats from "./ReviewsStats";
import ReviewForm from "./ReviewForm";
import EditForm from "./EditForm";
import Toggleable from "./Toggleable";
import studentServices from "../services/students"


const Review = ({ review, handleUpdate, handleDelete }) => {
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);
  const [newReviewText, setReview] = useState(review.review);
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
      })
    }
  };

  const handleDislike = async (event) => {
    event.preventDefault()
    if (!clicked) {
      setDislikes(dislikes + 1);
      setClicked(true);
      handleUpdate(review.id, {
        ...review,
        dislikes: dislikes + 1
      })
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault()
    handleUpdate(review.id, {
      ...review,
      review: newReviewText
    })
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    handleDelete(review.id)
  }

  const Verified = () => {
    if (studentList.map(student => student.id).includes(review.student_id)) {
      return (
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/768px-Twitter_Verified_Badge.svg.png" width={20} />
        </div>
      )
    }
  }

  return (
    <div className="review">
      <div>
        <p style={{ "fontSize": "0.75em" }}>{review.student_id} (hidden later)</p>
        <Verified />
        <p>{review.review}</p>
        <div>
          difficulty <StarReview starValue={review.difficulty} />
        </div>
        <div>
          workload <StarReview starValue={review.workload} />
        </div>
        <div>
          teaching <StarReview starValue={review.teaching} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={handleLike}>
          <AiOutlineLike />
          {likes}
        </button>
        <button onClick={handleDislike}>
          <AiOutlineDislike />
          {dislikes}
        </button>
        <input
          placeholder="Student ID to Edit/Delete"
          value={studentID}
          onChange={({ target }) => setStudentID(target.value)} />
      </div>
      {Number(studentID) === review.student_id
        ? <EditForm
          handleEdit={handleEdit}
          handleRemove={handleRemove}
          setReview={setReview}
          text={newReviewText} />
        : null}
    </div>
  );
};



const Reviews = ({ code, reviews, handleAdd, handleUpdate, handleDelete }) => {
  const reviewFormRef = useRef();
  const [studentList, setStudents] = useState([]);
  var verifiedReviews = [];
  var nonVerifiedReviews = [];

  useEffect(() => {
    studentServices.getStudents().then((response) => setStudents(response));
  }, []);

  if (reviews!==null) {
    verifiedReviews = reviews.filter(review => studentList.map(student => student.id).includes(review.student_id))
    nonVerifiedReviews = reviews.filter(review => !studentList.map(student => student.id).includes(review.student_id))
  }


  if (reviews === null) {
    return <p>select a course from the list</p>;
  } else if (reviews.length < 1) {
    return (
      <div>
        <h1>{code}</h1>
        <p>no reviews found</p>
        <ReviewsStats reviews={reviews} />
        <Toggleable buttonLabel="Write a review" ref={reviewFormRef}>
          <ReviewForm handleAdd={handleAdd} toggle={reviewFormRef} code={code} />
        </Toggleable>
      </div>
    );
  } else
    return (
      <div className="reviews">
        <h1>{code}</h1>
        <ReviewsStats reviews={reviews} />
        <Toggleable buttonLabel="Write a review" ref={reviewFormRef}>
          <ReviewForm handleAdd={handleAdd} code={code} toggle={reviewFormRef} />
        </Toggleable>
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
