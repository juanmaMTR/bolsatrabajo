import React from 'react';
const styleErrors={
    color:'red'
}

class ErrorForms extends React.Component {
    render() {
        const {message} = this.props
        return (
            <p style={styleErrors}>{message}</p>
        )
    }
}
export default ErrorForms