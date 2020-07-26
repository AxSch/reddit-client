import React, { Component, lazy, Suspense } from 'react'
import { fetchAPI } from '../../api/api'
import SkeletalLoading from '../../components/SkeletalLoading'
import ErrorBoundary from '../../ErrorBoundary'
import { selectPost } from '../../reducers/posts/postsSlice'
import store from '../../app/store'

const CommentList = lazy(() => import('../../components/CommentList/CommentList'))

class Post extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            postComments: null,
            post: null
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
        const { location } = this.props
        const splitLocation = location.pathname.split('/')
        const postId = splitLocation[splitLocation.length - 1]

        this.fetchComments() 
        const post = selectPost(store.getState(), postId)
        this.setState({post: post})
    }

    renderHeader(post) {
        if (post && post.length > 0) {
            return (
                <div>
                    <div>
                        <h1>{post[0].title}</h1>
                    </div>
                    <div>
                        <img src={post[0].url} alt={post[0].author_flair_text} width="" height="" />
                    </div>
                </div>
            )
        } else return ""
    }
    
    render() {
        const { postComments, post } = this.state

        return (
            <div>
                <ErrorBoundary>
                    <Suspense fallback={<SkeletalLoading type={"post"} />}>
                        {this.renderHeader(post)}
                        <CommentList comments={postComments ? postComments.children: []} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        )
    }
}

export default Post
