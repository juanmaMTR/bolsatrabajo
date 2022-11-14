import React from 'react';

class ErrorForms extends React.Component {
    render() {
        const {message} = this.props
        return (
            <p class="text-red-500 text-xs italic">{message}</p>
        )
    }
}
export default ErrorForms