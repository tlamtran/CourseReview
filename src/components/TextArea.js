import { Textarea } from "baseui/textarea";

const TextArea = ({ text, setText }) => {
  return (
    <Textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Share your experience here..."
      clearable
      clearOnEscape
      resize="both"
      maxLength={1000}
      overrides={{
        Input: {
          style: {
            maxWidth: "500px",
            maxHeight: "300px",
          },
        },
      }}
    />
  );
};

export default TextArea;
