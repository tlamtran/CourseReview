import StarReview from "./StarReview"

const ReviewsStats = ({ reviews }) => {
  const score =
    reviews
      .map((r) => r.difficulty + r.teaching + r.workload)
      .reduce((x, y) => x + y, 0) /
    (3 * reviews.length);

  return (
    <div className="reviews-stats"> 
      <h1 style={{ fontFamily: "Inter", position: 'relative', left: '65%', fontSize: '75px' }}>{Math.round(score * 10) / 10}</h1>
      <StarReview starValue={(Math.round(score * 10)/10)} starSize={30} starstyle={{ position: 'relative', left: '62.5%', bottom: 40 }}/>
    </div> 
  );
};

export default ReviewsStats;
