//import axios from 'axios'
//const baseUrl = 'backend url'

const reviews = [
    {
        code: 'CS-C3240',
        reviews: ['too much work', 'hard', 'difficult']
    },
    {
        code: 'CS-C3120',
        reviews: ['easy work', 'free credits']
    },
    {
        code: 'CS-E4000',
        reviews: ['dont take']
    }
]

const getReview = async (code) => {
    const foundReview = await reviews.find(review => review.code === code)
    if (foundReview) {
        return foundReview.reviews
    }
    else {
        return []
    }
}

const reviewServices = { getReview }

export default reviewServices