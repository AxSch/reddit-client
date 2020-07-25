import React, { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            errorMessage: ""
        }
    }

    componentDidCatch = (error, info) => {
        this.setState({ hasError: true, errorMessage: error })
    }
    render() {
        const { hasError, errorMessage } = this.state
        if (hasError) {
            console.log('error', errorMessage)
            return (
                <>
                    <h1>Something went terribly, terribly wrong</h1>
                </>
            )
        } else {
            return this.props.children
        }
    }
}

export default ErrorBoundary
