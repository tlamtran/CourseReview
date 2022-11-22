import { Checkbox } from "baseui/checkbox"
import { useState } from "react";
import courseServices from "../services/courses";

const Filters = ({ setCourses, courses, filters, setFilters }) => {
  const majorAllChecked = (filters[0] && filters[1])
  const isIndeterminate = (filters[0] || filters[1]) && !majorAllChecked


  return (
    <div className="filters">
      <h2 style={{ paddingLeft: 10 }}>Courses</h2>
      <div className="checkboxes" style={{ paddingLeft: 20 }}>
        <Checkbox
          checked={majorAllChecked}
          onChange={e => {
            setFilters([e.target.checked, e.target.checked, filters[2]]);
          }}
          overrides={{
            Checkmark: {
              style: ({ $checked, $isIndeterminate }) => ({
                outline: '#444444',
                backgroundColor: ($checked || $isIndeterminate) ? '#444444' : null,
              })
            }
          }}
          isIndeterminate={isIndeterminate}
        >
          Data Science major
        </Checkbox>
        <div style={{ padding: 8, paddingLeft: 20 }}>
          <Checkbox
            checked={filters[0]}
            onChange={e => {
              setFilters([e.target.checked, filters[1], filters[2]]);
            }}
            overrides={{
              Checkmark: {
                style: ({ $checked }) => ({
                  outline: '#444444',
                  backgroundColor: $checked ? '#444444' : null,
                })
              }
            }}
          >
            Basic studies
          </Checkbox>
          <Checkbox
            checked={filters[1]}
            onChange={e => {
              setFilters([filters[0], e.target.checked, filters[2]]);
            }}
            overrides={{
              Checkmark: {
                style: ({ $checked }) => ({
                  outline: '#444444',
                  backgroundColor: $checked ? '#444444' : null,
                })
              }
            }}
          >
            Major studies
          </Checkbox>
        </div>
        <Checkbox
          checked={filters[2]}
          onChange={e => {
            setFilters([filters[0], filters[1], e.target.checked]);
          }}
          overrides={{
            Checkmark: {
              style: ({ $checked }) => ({
                outline: '#444444',
                backgroundColor: $checked ? '#444444' : null,
              })
            }
          }}
        >
          Minor studies
        </Checkbox>
      </div>
    </div>
  );
};

export default Filters;
