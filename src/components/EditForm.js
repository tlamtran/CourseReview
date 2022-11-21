import TextArea from "./TextArea";

const EditForm = ({ handleEdit, setReview, handleRemove, text }) => {
  return (
    <form onSubmit={handleEdit}>
      <TextArea areaType={"review"} text={text} setText={setReview} />
      <button onClick={handleRemove}>Delete</button>
      <button type="submit">Edit</button>
    </form>
  );
}

export default EditForm