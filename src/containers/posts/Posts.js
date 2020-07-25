import React, { Component, lazy, Suspense } from 'react'
import { fetchAPI } from '../../api/api'
import { storePosts, setNextPage } from '../../reducers/posts/postsSlice'
import store from '../../app/store'
import SkeletalLoading from '../../components/SkeletalLoading'


const PostList = lazy(() => import('../../components/PostList/PostList'))
class Posts extends Component {

    async fetchPagePosts(pageString) {
        const posts  = await fetchAPI.fetchPosts(pageString)
        store.dispatch(storePosts(posts.data.children))
        store.dispatch(setNextPage(posts.data.after))  
        
    }
    
    componentDidMount() {
        this.fetchPagePosts()
    }

    render() {

        return (
            <>
                <Suspense fallback={<SkeletalLoading type="posts"/>}>
                    <PostList />
                </Suspense>
            </>
        )
    }
}

export default Posts
