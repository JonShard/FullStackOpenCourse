
const ErrorNotification = ({ message }) => {
    const style = {
        color:'rgb(156, 31, 31)',
        background: 'rgb(185, 159, 159)',
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

export default ErrorNotification