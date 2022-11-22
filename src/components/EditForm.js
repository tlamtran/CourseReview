import TextArea from "./TextArea";

const EditForm = ({ handleEdit, setReview, handleRemove, text }) => {
  return (
    <form onSubmit={handleEdit}>
      <TextArea areaType={"review"} text={text} setText={setReview} />
      <button className="general-btn" onClick={handleRemove}>Delete</button>
      <button className="general-btn" type="submit">Edit</button>
    </form>
  );
}

export default EditForm