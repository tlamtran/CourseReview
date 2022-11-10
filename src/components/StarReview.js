import { FaStar } from "react-icons/fa";
import { useState } from "react";

const StarReview = ({ starValue, setStarValue }) => {
  const stars = Array(1, 2, 3, 4, 5);
  const [hoverStars, setHoverStars] = useState(0);

  const handleClick = (value) => {
    if (setStarValue) setStarValue(value);
  };

  const handleHover = (value) => {
    setHoverStars(value);
  };

  const handleUnhover = () => {
    setHoverStars(0);
  };

  return stars.map((value) => {
    return (
      <FaStar
        className={`star${value}`}
        key={value}
        size={17}
        style={{
          marginRight: 1,
          cursor: "pointer",
        }}
        color={(starValue || hoverStars) >= value ? "#FFBA5A" : "#a9a9a9"}
        onClick={() => handleClick(value)}
        onMouseOver={() => handleHover(value)}
        onMouseLeave={handleUnhover}
      />
    );
  });
};

export default StarReview;
