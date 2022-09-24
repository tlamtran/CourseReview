// Main app

import Title from './components/Title'
import Course from './components/Course'
import StarReview from './components/StarReview'

//import courseServices from './services/courses'
import { useEffect, useState } from 'react'


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

    console.log(courses)
    return(
        <div>
            <Title text='Course reviews' />
            <StarReview size={20} space={5} />
            {courses.map(course =>
                <Course
                    code={course.code}
                    name={course.name}
                    key={course.code}
                />)
            }
        </div>
    )
}

export default App