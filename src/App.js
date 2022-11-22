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
  const [filters, setFilters] = useState([false, false, false])
  const [filterCourses, setFilterCourses] = useState([])

  useEffect(() => {
    courseServices.getCourses().then((response) => setCourses(response));
  }, []);

  useEffect(() => {
    const basic = filters[0] ? courseServices.getBasic() : []
    const major = filters[1] ? courseServices.getMajor() : []
    const minor = filters[2] ? courseServices.getMinor() : []
    const toDisplay = [].concat(basic, major, minor)
    console.log(filters)
    console.log(basic)
    console.log(major)
    console.log(minor)
    setFilterCourses([].concat(basic, major, minor))
  }, [filters])

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
    setReviews(reviews.map(review => review.id === id ? response : review))
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
          <Filters
            setCourses={setCourses}
            courses={courses}
            filters={filters}
            setFilters={setFilters} />
          <CourseList
            courses={courses}
            fetch={fetchCourseReviews}
            filterCourses={filterCourses} />
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
