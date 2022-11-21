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
  const [code, setCode] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    courseServices.getCourses().then((response) => setCourses(response));
  }, []);

  const fetchCourseReviews = async (code) => {
    const response = await reviewServices.getReview(code);
    setReviews(response);
    setCode(code);
  };

  const handleAdd = async (newReview) => {
    if (reviews.map(review => review.student_id).includes(newReview.student_id)) {
      window.alert("Student id already used!")
    }
    else {
      const response = await reviewServices.create(newReview);
      setReviews(reviews.concat(response));
    }
  };

  const handleUpdate = async (id, updatedReview) => {
    const response = await reviewServices.update(id, updatedReview);
    console.log(response)
    //setReviews(reviews.map(review => review.id === id ? response : review))
  };

  const handleDelete = async (id) => {
    setReviews(reviews.filter(review => review.id !== id))
    await reviewServices.remove(id)
  }


  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="container">
          <Header text="Course reviews" />
          <Filters setCourses={setCourses} courses={courses} />
          <CourseList courses={courses} fetch={fetchCourseReviews} />
          <Reviews
            code={code}
            reviews={reviews}
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
          <Footer />
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
