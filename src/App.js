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
  const [code, setCode] = useState(null)
  const [reviews, setReviews] = useState(null);


  useEffect(() => {
    courseServices.getCourses().then((response) => setCourses(response));
  }, []);

  const fetchCourseReviews = async (code) => {
    const response = await reviewServices.getReview(code);
    console.log(response)
    setReviews(response);
    setCode(code)
  };

  const handleAddReview = async (newReview) => {
    await reviewServices.create(newReview)
    setReviews(reviews.concat(newReview)); // fix later - should concat with response instead of newReview
  };

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="container">
          <Header text="Course reviews" />
          <Filters className="filters" />
          <CourseList courses={courses} fetch={fetchCourseReviews} />
          <Reviews code={code} reviews={reviews} handleAdd={handleAddReview} />
          <Footer />
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
