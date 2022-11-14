import { Textarea } from "baseui/textarea";

const TextArea = ({ areaType, text, setText }) => {
  
  if (areaType==="review")
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

  else
    return (
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Student number here..."
        clearable
        clearOnEscape
        resize="both"
        maxLength={1000}
        overrides={{
          Input: {
            style: {
              maxWidth: "500px",
              maxHeight: "40px",
            },
          },
        }}
      />
    );
};

export default TextArea;
