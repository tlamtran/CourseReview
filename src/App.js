import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'

const engine = new Styletron()
//-------------------------------------------- Base Web UI setup above

import Header from './components/Header'
import Footer from './components/Footer'
import CourseList from './components/CourseList'
import Toggleable from './components/Toggleable'
import Reviews from './components/Reviews'
import ReviewForm from './components/ReviewForm'
import courseServices from './services/courses'
import reviewServices from './services/review'
import { useEffect, useState, useRef } from 'react'
import './App.css'


const App = () => {

    const [courses, setCourses] = useState([])
    const [reviews, setReviews] = useState([])

    const reviewFormRef = useRef()

    useEffect(() => {
        fetchInitialData()
    }, [])

    const fetchInitialData = async () => {
        const response = await courseServices.getCourses()
        setCourses(response)
    }

    const fetchReview = async (code) => {
        const response = await reviewServices.getReview(code)
        setReviews(response)
    }

    const handleAdd = () => {
        reviewFormRef.current.toggleVisibility()
    }

    const ReviewDiv = () => {
        if (reviews.length === 0) {
            return (
                <div className='reviews'>
                    <p>select a course from the list</p>
                </div>
            )
        }
        else {
            return (
                <div className='reviews'>
                    <Toggleable
                        buttonLabel='Write a review'
                        ref={reviewFormRef}>
                        <ReviewForm handleAdd={handleAdd}/>
                    </Toggleable>
                    <Reviews reviews={reviews} />
                </div>
            )
        }
    }

    return (
        <StyletronProvider value={engine} >
            <BaseProvider theme={LightTheme}>
                <div className='container'>
                    <Header text='Course reviews' />
                    <div className='filters'>
                        <h1>filters</h1>
                    </div>
                    <div className='courses'>
                        <CourseList
                            courses={courses}
                            fetch={fetchReview} />
                    </div>
                    {ReviewDiv()}
                    <Footer />
                </div>
            </BaseProvider>
        </StyletronProvider>
    )
}

export default App