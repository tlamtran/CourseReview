import { useState, forwardRef, useImperativeHandle } from "react";
import { BsPencil } from "react-icons/bs";
import PropTypes from "prop-types";

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  const showIfTrue = { display: visible ? "" : "none" };
  const hideIfTrue = { display: visible ? "none" : "" };

  return (
    <div>
      <button className="general-btn" onClick={toggleVisibility} style={hideIfTrue}>
        <BsPencil />
        {" " + props.buttonLabel}
      </button>
      <div style={showIfTrue}>{props.children}</div>
      <button className="general-btn" onClick={toggleVisibility} style={showIfTrue}>
        cancel
      </button>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggleable.displayName = "Toggleable";

export default Toggleable;
