import StarReview from "./StarReview";
import TextArea from "./TextArea";
import { useState } from "react";

const ReviewForm = ({ handleAdd, code, toggle }) => {
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [workLoad, setWorkload] = useState(0);
  const [teaching, setTeaching] = useState(0);
  const [studentID, setStudentID] = useState("");


  const addReview = async (event) => {
    event.preventDefault();
    if (text.length === 0 || studentID.length === 0) {
      window.alert("Review text or student id missing.")
    } else if (studentID.length < 6 || studentID.length >7 ) {
      window.alert("Student id must be 6-7 digits long.")
    } else {
      const newReview = {
        student_id: Number(studentID),
        likes: 0,
        dislikes: 0,
        course_id: code,
        review: text,
        difficulty: Math.max(difficulty, 1),
        workload: Math.max(workLoad, 1),
        teaching: Math.max(teaching, 1)
      };
      handleAdd(newReview);
      setText("");
      setDifficulty(0);
      setWorkload(0);
      setTeaching(0);
      setStudentID("");
      toggle.current.toggleVisibility()
    }
  };

  return (
    <form onSubmit={addReview}>
      <div className="review-form">
        <div className="review-and-stars">
          <TextArea areaType={"review"} text={text} setText={setText} />
          <div className="star-ratings">
            <div>
              difficulty {difficulty}
              <StarReview starValue={difficulty} setStarValue={setDifficulty} />
            </div>
            <div>
              workload {workLoad}
              <StarReview starValue={workLoad} setStarValue={setWorkload} />
            </div>
            <div>
              teaching {teaching}
              <StarReview starValue={teaching} setStarValue={setTeaching} />
            </div>
          </div>
        </div>
        Student ID 
        <input
          className="student-id-input"
          placeholder="6-7 digits"
          value={studentID}
          type="number"
          onChange={({ target }) => setStudentID(target.value)}
        />
        <div>
          <button className="post-btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
