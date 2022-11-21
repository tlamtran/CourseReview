import { Checkbox } from "baseui/checkbox"
import { useEffect, useState } from "react";
import courseServices from "../services/courses";

const Filters = ({ setCourses, courses }) => {
  const [minor, setMinor] = useState(false)
  const [elective, setElective] = useState(false)
  const [majorCheckboxes, setMajorCheckboxes] = useState([false, false])
  const majorAllChecked = majorCheckboxes.every(x => x === true)
  const isIndeterminate = majorCheckboxes.some(Boolean) && !majorAllChecked


  return (
    <div className="filters">
      <h2 style={{ paddingLeft: 10 }}>Courses</h2>
      <div className="checkboxes" style={{ paddingLeft: 20 }}>
        <Checkbox
          checked={majorAllChecked}
          onChange={e => {
            setMajorCheckboxes([e.target.checked, e.target.checked]);
          }}
          isIndeterminate={isIndeterminate}
        >
          Data Science major
        </Checkbox>
        <div style={{ padding: 8, paddingLeft: 20 }}>
          <Checkbox
            checked={majorCheckboxes[0]}
            onChange={e => {
              setMajorCheckboxes([e.target.checked, majorCheckboxes[1]]);
            }}
          >
            Basic studies
          </Checkbox>
          <Checkbox
            checked={majorCheckboxes[1]}
            onChange={e => {
              setMajorCheckboxes([majorCheckboxes[0], e.target.checked]);
            }}
          >
            Major studies
          </Checkbox>
        </div>
        <Checkbox checked={minor} onChange={() => setMinor(!minor)}>
          Minor studies
        </Checkbox>
        <Checkbox checked={elective} onChange={() => setElective(!elective)}>
          Elective studies
        </Checkbox>
      </div>
    </div>
  );
};

export default Filters;
