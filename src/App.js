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
import ReviewsStats from './components/ReviewsStats'
import ReviewForm from './components/ReviewForm'
import courseServices from './services/courses'
import reviewServices from './services/review'
import { useEffect, useState, useRef } from 'react'
import './App.css'


const App = () => {

    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState(null)

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
        setCourse(response)
    }

    const handleAdd = ( text, difficulty, workLoad, teaching ) => {
        const newReview = {
            text: text,
            difficulty: difficulty,
            workLoad: workLoad,
            teaching: teaching,
            likes: 0,
            dislikes: 0,
            id: Math.floor(Math.random() * 1000)
        }
        setCourse(course.reviews.concat(newReview))
        reviewFormRef.current.toggleVisibility()
    }

    const ReviewDiv = () => {
        if (course === null) {
            return (
                <div className='reviews'>
                    <p>select a course from the list</p>
                </div>
            )
        }
        else {
            return (
                <div className='reviews'>
                    <h1>{course.code}</h1>
                    <ReviewsStats course={course} />
                    <Toggleable
                        buttonLabel='Write a review'
                        ref={reviewFormRef}>
                        <ReviewForm handleAdd={handleAdd}/>
                    </Toggleable>
                    <Reviews course={course} />
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