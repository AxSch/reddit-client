import React, { Component, lazy, Suspense } from 'react'
import { fetchAPI } from '../../api/api'
import SkeletalLoading from '../../components/SkeletalLoading'
import ErrorBoundary from '../../ErrorBoundary'
// import CommentList from '../../components/CommentList/CommentList'

const CommentList = lazy(() => import('../../components/CommentList/CommentList'))

class Post extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            postComments: null,
        }
    }

    async fetchComments() {
        const { location } = this.props
        try {
            const splitLocation = location.pathname.split('/')
            const postId = splitLocation[splitLocation.length - 1]
            const postComments = await fetchAPI.fetchPostComments(postId)
            this.setState({ postComments: postComments[1].data })
        } catch(error) {
            throw new Error("Comments could not be fetched at this time. Try again later.")
        }

    }
    
    componentDidMount() {
        this.fetchComments() 
    }
    
    render() {
        const { postComments } = this.state

        return (
            <div>
                <ErrorBoundary>
                    <Suspense fallback={<SkeletalLoading type={"post"} />}>
                        <CommentList comments={postComments ? postComments.children: []} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        )
    }
}

export default Post
