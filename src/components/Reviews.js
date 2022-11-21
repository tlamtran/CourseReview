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
  const [clicked, setClicked] = useState(false);


  const handleLike = async () => {
    if (!clicked) {
      setLikes(likes + 1);
      setClicked(true);
      handleUpdate(review.id, {
        likes: likes + 1,
        dislikes: dislikes
      })
    }
  };

  const handleDislike = async () => {
    if (!clicked) {
      setDislikes(dislikes + 1);
      setClicked(true);
      handleUpdate(review.id, {
        likes: likes,
        dislikes: dislikes + 1
      })
    }
  };

  const handleDeleteButton = async () => {
    try {
      const deleteReview = await fetch(`http://localhost:3001/reviews/${review.id}`, {
        method: "DELETE"
      });

      handleDelete(review.id);
      
      console.log(deleteReview);
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleEditButton = async (newReview) => {
      handleUpdate(review.id, {
        review: newReview,
      })
  }

  return (
    <div className="review">
      <div>
        <p style={{ "fontSize": "0.75em" }}>{review.student_id}</p>
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
