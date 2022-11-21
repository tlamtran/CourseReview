import ChevronRight from 'baseui/icon/chevron-right'
import { StatefulMenu } from 'baseui/menu'
import { ListItemLabel, MenuAdapter } from 'baseui/list'
import React, { useState } from 'react'

const Course = React.forwardRef((props, ref) => (
    <MenuAdapter
        {...props}
        ref={ref}
        endEnhancer={() => <ChevronRight />}
    >
        <ListItemLabel>
            {props.item.code} - {props.item.name.en}
        </ListItemLabel>
    </MenuAdapter>
))

const CourseList = ({ courses, fetch }) => {
    const [search, setSearch] = useState("")

    return (
        <div className="courses">
            <input
                className="search"
                value={search}
                onChange={({ target }) => setSearch(target.value)}
                placeholder="Search by course name"
            />
            <StatefulMenu
                items={courses.filter(course =>
                    course.name.en.toLowerCase()
                        .includes(search))
                    .slice(0, 30)}
                onItemSelect={item => fetch(item.item.code)}
                overrides={{
                    List: {
                        style: {
                            boxShadow: '0px 0px 0px',
                            gridColumnStart: 1,
                            gridColumnEnd: 2,
                            gridRowStart: 3,
                            gridRowEnd: 4,
                            maxHeight: '40vh',
                            padding: '0px',
                            borderRadius: '0px',
                            paddingLeft: '10px'
                        }
                    },
                    Option: {
                        props: {
                            overrides: {
                                ListItem: {
                                    component: Course
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

Course.displayName = 'Course'

export default CourseList