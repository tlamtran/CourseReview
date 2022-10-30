import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import StarReview from "./StarReview";
import ReviewsStats from "./ReviewsStats";
import ReviewForm from "./ReviewForm";
import Toggleable from "./Toggleable";




const Review = ({ review }) => {
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);
  const [clicked, setClicked] = useState(false);

  const handleLike = () => {
    if (!clicked) {
      setLikes(likes + 1);
      setClicked(true);
    }
  };

  const handleDislike = () => {
    if (!clicked) {
      setDislikes(dislikes + 1);
      setClicked(true);
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

const Reviews = ({ course, handleAdd, ref }) => {
  if (course === null) {
    return <p>select a course from the list</p>;
  } else if (course.reviews.length < 1) {
    return (
      <div>
        <h1>{course.code}</h1>
        <p>no reviews found</p>
        <ReviewsStats course={course} />
        <Toggleable buttonLabel="Write a review" ref={ref}>
          <ReviewForm handleAdd={handleAdd} />
        </Toggleable>
      </div>
    );
  } else
    return (
      <div className="reviews">
        <h1>{course.code}</h1>
        <ReviewsStats course={course} />
        <Toggleable buttonLabel="Write a review" ref={ref}>
          <ReviewForm handleAdd={handleAdd} />
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
