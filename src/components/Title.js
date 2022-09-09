const Title = ({ text }) => {
    const titleStyle = {
        color: 'darkBlue'
    }

    return(
        <h1 style={titleStyle}>{text}</h1>
    )
}

export default Title