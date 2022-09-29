// Main app

import Header from './components/Header'
import Footer from './components/Footer'
import Course from './components/Course'
import StarReview from './components/StarReview'
//import courseServices from './services/courses'
import { useEffect, useState } from 'react'
import './App.css'


const App = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        setCourses(Array(
            {
                code: 'CS-0000',
                name: 'Programming 0'
            },
            {
                code: 'CS-1234',
                name: 'Programming 1'
            }
        ))
    }, [])

    return(
        <div className='container'>
            <Header text='Course reviews' />
            <div className='reviews'>
                <StarReview size={20} space={5} />
            </div>
            <div className='courses'>
                {courses.map(course =>
                    <Course
                        code={course.code}
                        name={course.name}
                        key={course.code}
                    />)
                }
            </div>
            <Footer />
        </div>
    )
}

export default App