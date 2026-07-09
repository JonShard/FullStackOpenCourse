
const Notification = ({ message }) => {
    const style = {
        color:'rgb(26, 122, 47)',
        background: 'rgb(164, 185, 164)',
        fontSize: 30,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null) {
        return null
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification