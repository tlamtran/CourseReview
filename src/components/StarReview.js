import { FaStar } from 'react-icons/fa'
import { useState } from 'react'


const StarReview = ({ size, space }) => {
    const stars = Array(1,2,3,4,5)
    const [clickStars, setClickStars] = useState(0)
    const [hoverStars, setHoverStars] = useState(0)

    const handleClick = value => {
        console.log(value)
        setClickStars(value)
    }

    const handleHover = value => {
        setHoverStars(value)
    }

    const handleUnhover = () => {
        setHoverStars(0)
    }

    return (
        stars.map( value => {
            return (
                <FaStar
                    key={value}
                    size={size} // size of the star
                    style={{
                        marginRight: space, // space between the stars
                        cursor: 'pointer'
                    }}
                    color={(clickStars || hoverStars) >= value ? '#FFBA5A' : '#a9a9a9'}
                    onClick={() => handleClick(value)}
                    onMouseOver={() => handleHover(value)}
                    onMouseLeave={handleUnhover}
                />
            )
        })
    )
}

export default StarReview