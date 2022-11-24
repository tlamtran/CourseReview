import ChevronRight from "baseui/icon/chevron-right";
import { StatefulMenu } from "baseui/menu";
import { ListItemLabel, MenuAdapter } from "baseui/list";
import React, { useState } from "react";

const Course = React.forwardRef((props, ref) => {
    let conditionalBg = "credits in-elec";
    
    if (props.item.inDS) {
        conditionalBg = "credits in-major-basic";
    } else if (props.item.inMinor) {
        conditionalBg = "credits in-minor";
    } else {
        conditionalBg = "credits in-elec";
    }

    return(
    <MenuAdapter {...props} ref={ref} endEnhancer={() => <ChevronRight />}>
        {/* <ListItemLabel> */}
        <div className="course-name-credits">
            <div className={conditionalBg}>
                <div className="credit-amount">
                    { props.item.credits.min === props.item.credits.max ? `${props.item.credits.min}` : `${props.item.credits.min} - ${props.item.credits.max}` }
                </div>
                <div>
                    cr
                </div>
            </div>
            <div className="course-name">
                {props.item.code} - {props.item.name.en}
            </div>
        </div>
        {/* </ListItemLabel> */}
    </MenuAdapter>
)});

const CourseList = ({ courses, fetch }) => {
    const [search, setSearch] = useState("");

    return (
        <div className="courses">
            <div className="search-div">
                <input
                    className="search"
                    value={search}
                    onChange={({ target }) => setSearch(target.value)}
                    placeholder="Search by course name"
                />
            </div>
            <hr></hr>
            <StatefulMenu
                items={
                    courses
                        .filter((course) =>
                            course.name.en.toLowerCase().includes(search.toLowerCase())
                        )
                        .slice(0, 30)
                }
                onItemSelect={(item) => fetch(item.item)}
                overrides={{
                    List: {
                        style: {
                            boxShadow: "0px 0px 0px",
                            gridColumnStart: 1,
                            gridColumnEnd: 2,
                            gridRowStart: 3,
                            gridRowEnd: 4,
                            maxHeight: "40vh",
                            minHeight: "40vh",
                            padding: "0px",
                            borderRadius: "0px",
                            paddingLeft: "10px",
                        },
                    },
                    Option: {
                        props: {
                            overrides: {
                                ListItem: {
                                    component: Course,
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

Course.displayName = "Course";

export default CourseList;
