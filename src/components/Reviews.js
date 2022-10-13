import { useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'

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
        <div>
            <p>{review.text}</p>
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

const Reviews = ({ reviews }) => {
    return (
        reviews.map( (review) =>
            <Review
                review={review}
                key={review.id}
            />
        )
    )
}

export default Reviews