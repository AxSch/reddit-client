import React, { Component } from 'react'
import { fetchAPI } from '../../api/api'

class Post extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            postComments: null,
            loading: true
        }
    }

    async fetchComments() {
        const { loading } = this.state
        const { location } = this.props

        const splitLocation = location.pathname.split('/')
        const postId = splitLocation[splitLocation.length - 1]
        const postComments = await fetchAPI.fetchPostComments(postId)
        this.setState({ postComments: postComments[1].data })
        this.setState({ loading: !loading})

    }
    
    componentDidMount() {
        this.fetchComments() 
    }
    
    render() {
        const { loading } = this.state
        
        return (
            <div>
                {!loading ? <div>Comments section</div> : <div>Lazy loading</div>}
            </div>
        )
    }
}

export default Post
