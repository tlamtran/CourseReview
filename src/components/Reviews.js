import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useState, useRef } from "react";
import StarReview from "./StarReview";
import ReviewsStats from "./ReviewsStats";
import ReviewForm from "./ReviewForm";
import Toggleable from "./Toggleable";




const Review = ({ review }) => {
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);
  const [clicked, setClicked] = useState(false);

  const handleLike = async () => {
    if (!clicked) {
      setLikes(likes + 1);
      setClicked(true);

      try {
      const response = await fetch(`http://localhost:3001/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
              likes: likes,
              dislikes: dislikes,
        })
      });

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
    }
  };



  const handleDislike = async () => {
    if (!clicked) {
      setDislikes(dislikes + 1);
      setClicked(true);

      try {
      const response = await fetch(`http://localhost:3001/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
              likes: likes,
              dislikes: dislikes,
        })
      });

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
    }
  };

  return (
    <div className="review">
      <div>
        <p>{review.text}</p>
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
    </div>
  );
};

const Reviews = ({ course, handleAdd, review_id }) => {
  const reviewFormRef = useRef();

  if (course === null) {
    return <p>select a course from the list</p>;
  } else if (course.reviews.length < 1) {
    return (
      <div>
        <h1>{course.code}</h1>
        <p>no reviews found</p>
        <ReviewsStats course={course} />
        <Toggleable buttonLabel="Write a review" ref={reviewFormRef}>
          <ReviewForm handleAdd={handleAdd} toggle={reviewFormRef} course={course} review_id={review_id} />
        </Toggleable>
      </div>
    );
  } else
    return (
      <div className="reviews">
        <h1>{course.code}</h1>
        <ReviewsStats course={course} />
        <Toggleable buttonLabel="Write a review" ref={reviewFormRef}>
          <ReviewForm handleAdd={handleAdd} course={course} toggle={reviewFormRef} review_id={review_id}/>
        </Toggleable>
        <div>
          {course.reviews.map((review) => (
            <Review review={review} key={review.id} />
          ))}
        </div>
      </div>
    );
};

export default Reviews;
