const Course = ({ code, name }) => {

    const courseStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={courseStyle}>
            {code} - {name}
        </div>
    )
}

export default Course