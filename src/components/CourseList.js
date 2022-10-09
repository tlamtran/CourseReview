import ChevronRight from 'baseui/icon/chevron-right'
import { StatefulMenu } from 'baseui/menu'
import { ListItemLabel, MenuAdapter } from 'baseui/list'
import React from 'react'

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

const CourseList = ({ courses }) => {
    return (
        <StatefulMenu
            items={courses}
            onItemSelect={item =>
                console.log(`${item.item.code} ${item.item.name.en}`)}
            overrides={{
                List: {
                    style: {
                        height: '415px',
                        width: '790px',
                        boxShadow: '0px 0px 0px',
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
    )
}

Course.displayName = 'Course'

export default CourseList