import { Checkbox } from "baseui/checkbox"
import { useEffect, useState } from "react";
import courseServices from "../services/courses";

const Filters = ({ setCourses }) => {
  const [filters, setFilters] = useState([])
  const [search, setSearch] = useState("")
  const [minor, setMinor] = useState(false)
  // major checkboxes
  const [majorCheckboxes, setMajorCheckboxes] = useState([true, false])
  const majorAllChecked = majorCheckboxes.every(x => x === true)
  const isIndeterminate = majorCheckboxes.some(Boolean) && !majorAllChecked


  useEffect(() => {

  }, [filters])

  return (
    <div className="filters">
      <div style={{ display: "inline-block", marginBottom: 20 }}>
        <b style={{ fontSize: 25, marginRight: 25 }}>Courses</b>
        <input
          className="searchbar"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Search by code/name"
        />
      </div>
      <div className="checkboxes">
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
      </div>
    </div>
  );
};

export default Filters;
