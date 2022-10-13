
const Reviews = ({ reviews }) => {
    return (
        reviews.map( (review, i) =>
            <div key={i}>
                {review}
            </div>
        )
    )
}

export default Reviews