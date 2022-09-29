// Main app

import Header from './components/Header'
import Footer from './components/Footer'
import Course from './components/Course'
import StarReview from './components/StarReview'
//import courseServices from './services/courses'
import { useEffect, useState } from 'react'
import './App.css'
import courseServices from './services/courses'


const App = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetchInitialData()
    }, [])

    const fetchInitialData = async () => {
        const response = await courseServices.getCS()
        console.log(response)
        setCourses(response)
    }

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
                        name={course.name.en}
                        key={course.code}
                    />)
                }
            </div>
            <Footer />
        </div>
    )
}

export default App