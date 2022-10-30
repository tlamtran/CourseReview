const ReviewsStats = ({ course }) => {
  console.log(course);
  const score =
    course.reviews
      .map((r) => r.difficulty + r.teaching + r.workload)
      .reduce((x, y) => x + y, 0) /
    (3 * course.reviews.length);

  return <h1>{Math.round(score * 10) / 10}/5</h1>;
};

export default ReviewsStats;
