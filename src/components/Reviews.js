import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useState, useRef } from "react";
import StarReview from "./StarReview";
import ReviewsStats from "./ReviewsStats";
import ReviewForm from "./ReviewForm";
import Toggleable from "./Toggleable";


const Review = ({ review, handleUpdate, handleDelete }) => {
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);
  const [newReviewText, setReview] = useState(review.review);
  const [clicked, setClicked] = useState(false);
  const [studentID, setStudentID] = useState("");


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

  const handleDislike = async () => {
    if (!clicked) {
      setDislikes(dislikes + 1);
      setClicked(true);
      handleUpdate(review.id, {
        ...review,
        dislikes: dislikes + 1
      })
    }
  };

  const handleEditButton = async () => {
    console.log("edit button clicked")
    console.log(newReviewText);

    if (Number(studentID) === review.student_id) {
      handleUpdate(review.id, {
        ...review,
        review: newReviewText
      })

      window.location = "/";
    }
  }


  const handleDeleteButton = async () => {
    if (Number(studentID) === review.student_id) {
      handleDelete(review.id)
    }
  }

  return (
    <div className="review">
      <div>
        <p style={{ "fontSize": "0.75em" }}>{review.student_id} (hidden later)</p>
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
        <button onClick={handleDeleteButton}>
          Delete
        </button>
        <button onClick={handleEditButton}>
          Edit
        </button>
      </div>
      <div>
        <input 
          placeholder="Edit review..."
          value={newReviewText}
          onChange={({ target }) => setReview(target.value)} />
      </div>
      <div>
        <input
          placeholder="Student ID to Edit/Delete"
          value={studentID}
          onChange={({ target }) => setStudentID(target.value)} />
      </div>
    </div>
  );
};



const Reviews = ({ code, reviews, handleAdd, handleUpdate, handleDelete }) => {
  const reviewFormRef = useRef();

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
          {reviews.map((review) => ( // should be sorted according to likes/dislikes
            <Review review={review} key={review.id} handleUpdate={handleUpdate} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    );
};

export default Reviews;
