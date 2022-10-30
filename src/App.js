import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();
//-------------------------------------------- Base Web UI setup above

import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseList from "./components/CourseList";
import Reviews from "./components/Review";
import courseServices from "./services/courses";
import reviewServices from "./services/review";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import Filters from "./components/Filters";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);

  const reviewFormRef = useRef();

  useEffect(() => {
    courseServices.getCourses().then((response) => setCourses(response));
  }, []);

  const fetchReview = async (code) => {
    const response = await reviewServices.getReview(code);
    setCourse(response);
  };

  const handleAddReview = (text, difficulty, workLoad, teaching) => {
    const newReview = {
      text: text,
      difficulty: Math.max(difficulty, 1),
      workLoad: Math.max(workLoad, 1),
      teaching: Math.max(teaching, 1),
      likes: 0,
      dislikes: 0,
      id: Math.floor(Math.random() * 1000),
    };
    setCourse({ ...course, reviews: course.reviews.concat(newReview) });
    reviewFormRef.current.toggleVisibility();
  };

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="container">
          <Header text="Course reviews" />
          <Filters className="filters" />
          <CourseList courses={courses} fetch={fetchReview} />
          <Reviews course={course} handleAdd={handleAddReview} ref={reviewFormRef} />
          <Footer />
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
