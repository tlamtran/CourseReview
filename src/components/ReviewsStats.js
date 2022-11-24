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
      <div className="bars">
        <div className="stats-difficulty">
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
                  bottom: '20%',
                  left: '0.7%'
                }
              }
            }}
          /> 
        </div>
        <div className="stats-teaching">
          Teaching  <ProgressBar
            value = {((reviews.map((r) => r.teaching).reduce((x, y) => x+y, 0))/reviews.length)*20}
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
                  bottom: '20%',
                  left: '0.4%'
                }
              }
            }}
          /> 
        </div>
        <div className="stats-workload">
          Workload <ProgressBar
            value = {((reviews.map((r) => r.workload).reduce((x, y) => x+y, 0))/reviews.length)*20}
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
                  bottom: '20%'
                }
              }
            }}
          /> 
        </div>
        <div className="overall-score">
          <h1>{Math.round(score * 10) / 10}</h1> 
          <StarReview starValue={(Math.round(score * 10)/10)} starSize={30} starstyle={{ position: 'relative', left: '-12%', bottom: 70 }}/>
        </div>
      </div>  
    </div> 
  );
};

export default ReviewsStats;
