import React, { Component, lazy, Suspense } from 'react'
import { fetchAPI } from '../../api/api'
import { storePosts, setNextPage } from '../../reducers/posts/postsSlice'
import store from '../../app/store'
import SkeletalLoading from '../../components/SkeletalLoading'
import ErrorBoundary from '../../ErrorBoundary'


const PostList = lazy(() => import('../../components/PostList/PostList'))
class Posts extends Component {

    async fetchPagePosts(pageString) {
        try {
            const posts  = await fetchAPI.fetchPosts(pageString)
            store.dispatch(storePosts(posts.data.children))
            store.dispatch(setNextPage(posts.data.after))  
        } catch(error) {
            throw new Error("Posts could not be loaded. Please try again later.")
        }
    }
    
    componentDidMount() {
        this.fetchPagePosts()
    }

    render() {

        return (
            <>  
                <ErrorBoundary>
                    <Suspense fallback={<SkeletalLoading type="posts"/>}>
                        <PostList />
                    </Suspense>
                </ErrorBoundary>
            </>
        )
    }
}

export default Posts
