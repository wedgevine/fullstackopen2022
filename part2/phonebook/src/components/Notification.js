import React from 'react'

/*
const style = {
    color: 'green',
    border: 'solid'
}
*/

const Notification = ({ message, style }) => {
    console.log(message, style)
    if (message === null) {
        return null
    }

    return (
        <div className='error' style={style}>
            {message}
        </div>
    )
}

export default Notification
