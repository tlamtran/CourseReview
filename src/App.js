import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();
//-------------------------------------------- Base Web UI setup above

import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseList from "./components/CourseList";
import Reviews from "./components/Reviews";
import courseServices from "./services/courses";
import reviewServices from "./services/review";
import { useEffect, useState } from "react";
import "./App.css";
import Filters from "./components/Filters";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);


  useEffect(() => {
    courseServices.getCourses().then((response) => setCourses(response));
  }, []);

  const fetchCourseReview = async (code) => {
    const response = await reviewServices.getReview(code);
    console.log(response)
    setCourse(response);
  };

  const handleAddReview = (text, difficulty, workLoad, teaching) => {
    const newReview = {
      text: text,
      difficulty: Math.max(difficulty, 1),
      workload: Math.max(workLoad, 1),
      teaching: Math.max(teaching, 1),
      likes: 0,
      dislikes: 0,
      id: Math.floor(Math.random() * 1000),
    };
    setCourse({ ...course, reviews: course.reviews.concat(newReview) });
  };

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="container">
          <Header text="Course reviews" />
          <Filters className="filters" />
          <CourseList courses={courses} fetch={fetchCourseReview} />
          <Reviews course={course} handleAdd={handleAddReview} />
          <Footer />
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
