import React, { Component, lazy, Suspense } from 'react'
import { fetchAPI } from '../../api/api'
import { storePosts, setNextPage } from '../../reducers/posts/postsSlice'
import { store } from '../../app/store'
import SkeletalLoading from '../../components/SkeletalLoading/SkeletalLoading'
import ErrorBoundary from '../../ErrorBoundary'
import './Posts.scss'


const PostList = lazy(() => import('../../components/PostList/PostList'))
class Posts extends Component {

    async fetchPagePosts() {
        try {
            const posts = await fetchAPI.fetchPosts()
            store.dispatch(storePosts(posts.data.children))
            store.dispatch(setNextPage(posts.data.after))
        } catch (error) {
            throw new Error("Posts could not be loaded. Please try again later.")
        }
    }

    componentDidMount() {
        this.fetchPagePosts()
    }

    render() {
        const { location } = this.props

        return (
            <>
                <ErrorBoundary>
                    <Suspense fallback={<SkeletalLoading type="posts" />}>
                        <div className="posts-header">
                            <h1>Top Posts for {location.pathname.substr(1)}</h1>
                        </div>
                        <PostList />
                    </Suspense>
                </ErrorBoundary>
            </>
        )
    }
}

export default Posts
