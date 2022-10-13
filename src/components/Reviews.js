import { useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'
import StarReview from './StarReview'

const Review = ({ review }) => {
    const [likes, setLikes] = useState(review.likes)
    const [dislikes, setDislikes] = useState(review.dislikes)
    const [clicked, setClicked] = useState(false)

    const handleLike = () => {
        if (!clicked) {
            setLikes(likes + 1)
            setClicked(true)
        }
    }

    const handleDislike = () => {
        if (!clicked) {
            setDislikes(dislikes + 1)
            setClicked(true)
        }
    }


    return (
        <div className='review'>
            <div>
                <p>{review.text}</p>
                <div>
                    difficulty <StarReview starValue={review.difficulty}/>
                </div>
                <div>
                    workload <StarReview starValue={review.workload}/>
                </div>
                <div>
                    teaching <StarReview starValue={review.teaching}/>
                </div>
            </div>
            <button
                onClick={handleLike}
            >
                <AiOutlineLike />
                {likes}
            </button>
            <button
                onClick={handleDislike}
            >
                <AiOutlineDislike />
                {dislikes}
            </button>
        </div>
    )
}

const Reviews = ({ course }) => {
    return (
        course.reviews.map( (review) =>
            <Review
                review={review}
                key={review.id}
            />
        )
    )
}

export default Reviews