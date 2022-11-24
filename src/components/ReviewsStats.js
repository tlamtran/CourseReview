import StarReview from "./StarReview"
import { ProgressBar } from "baseui/progress-bar";

const ReviewsStats = ({ reviews }) => {
  const score =
    reviews
      .map((r) => r.difficulty + r.teaching + r.workload)
      .reduce((x, y) => x + y, 0) /
    (3 * reviews.length);

  return (
    <div className="reviews-stats"> 
      <div>
        Difficulty <ProgressBar
          value = {((reviews.map((r) => r.difficulty).reduce((x, y) => x+y, 0))/reviews.length)*20}
          overrides={{
            BarProgress: {
              style: {
                backgroundColor: '#DCB757',
              }
            },
            BarContainer : {
              style: {
                backgroundColor: '#D9D9D9',
                outline: '#FFFFFF',
                width: '40%',
                position: 'relative',
                top: '10%',
                left: '10%'
              }
            }
          }}
        />
      </div> 
      <h1 style={{ fontFamily: "Inter", position: 'relative', left: '65%', fontSize: '75px' }}>{Math.round(score * 10) / 10}</h1>
      <StarReview starValue={(Math.round(score * 10)/10)} starSize={30} starstyle={{ position: 'relative', left: '62.5%', bottom: 40 }}/>
    </div> 
  );
};

export default ReviewsStats;
