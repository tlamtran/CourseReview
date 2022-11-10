import StarReview from "./StarReview";
import TextArea from "./TextArea";
import { useState } from "react";

const ReviewForm = ({ handleAdd, toggle }) => {
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [workLoad, setWorkload] = useState(0);
  const [teaching, setTeaching] = useState(0);
  

  const addReview = async (event) => {
    event.preventDefault();
    handleAdd(text, difficulty, workLoad, teaching);
    
    try {
      const response = await fetch("http://localhost:3001/reviews", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
                review: text,
                difficulty: Math.max(difficulty, 1),
                workload: Math.max(workLoad, 1),
                teaching: Math.max(difficulty, 1)
        })
      });

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }

    setText("");
    setDifficulty(0);
    setWorkload(0);
    setTeaching(0);
    toggle.current.toggleVisibility()
  };

  return (
    <form onSubmit={addReview}>
      <div>
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
        <TextArea text={text} setText={setText} />
        <button type="submit">Post</button>
      </div>
    </form>
  );
};

export default ReviewForm;
