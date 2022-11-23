import TextArea from "./TextArea";
import StarReview from "./StarReview";

const EditForm = ({ handleEdit, setReview, setDifficulty, setWorkload, setTeaching, newDifficulty, newWorkload, newTeaching, handleRemove, text }) => {
  return (
    <form onSubmit={handleEdit}>
      <div className="review-text-stars">
        <TextArea areaType={"review"} text={text} setText={setReview} />
        <div className="star-ratings">
          <div>
            difficulty <StarReview starValue={newDifficulty} setStarValue={setDifficulty}/>
          </div>
          <div>
            workload <StarReview starValue={newWorkload} setStarValue={setWorkload}/>
          </div>
          <div>
            teaching <StarReview starValue={newTeaching} setStarValue={setTeaching}/>
          </div>
        </div>
      </div>
      <button className="general-btn" onClick={handleRemove}>Delete</button>
      <button className="general-btn" type="submit">Edit</button>
    </form>
  );
}

export default EditForm