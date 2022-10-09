import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'

const engine = new Styletron()
//-------------------------------------------- Base Web UI setup above

import Header from './components/Header'
import Footer from './components/Footer'
import CourseList from './components/CourseList'
import StarReview from './components/StarReview'
import courseServices from './services/courses'
import { useEffect, useState } from 'react'
import './App.css'


const App = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetchInitialData()
    }, [])

    const fetchInitialData = async () => {
        const response = await courseServices.getCourses()
        console.log(response)
        setCourses(response)
    }

    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <div className='container'>
                    <Header text='Course reviews' />
                    <div className='reviews'>
                        <StarReview size={20} space={5} />
                    </div>
                    <div className='courses'>
                        <CourseList courses={courses}/>
                    </div>
                    <Footer />
                </div>
            </BaseProvider>
        </StyletronProvider>
    )
}

export default App