import React, { Component, lazy, Suspense } from 'react'
import { storePosts, setNextPage, updatePosts, selectNextPage } from '../../reducers/posts/postsSlice'
import { debounce } from "lodash"
import { fetchAPI } from '../../api/api'
import { store } from '../../app/store'
import SkeletalLoading from '../../components/SkeletalLoading/SkeletalLoading'
import ErrorBoundary from '../../ErrorBoundary'
import './Posts.scss'


const PostList = lazy(() => import('../../components/PostList/PostList'))

class Posts extends Component {

    async fetchPagePosts(pageString) {
        try {
            if (pageString) {
                const posts = await fetchAPI.fetchPosts(pageString)
                store.dispatch(updatePosts(posts.data.children))
                store.dispatch(setNextPage(posts.data.after))
            } else {
                const posts = await fetchAPI.fetchPosts()
                store.dispatch(storePosts(posts.data.children))
                store.dispatch(setNextPage(posts.data.after))
            }
        } catch (error) {
            throw new Error("Posts could not be loaded. Please try again later.")
        }
    }

    lazyLoader = () => {
        const { innerHeight, scrollY } = window
        const { offsetHeight } = document.body
        const advance = 100
        const nextPage = selectNextPage(store.getState())

        if (innerHeight + scrollY + advance >= offsetHeight) {
            this.fetchPagePosts(nextPage)
        }
    }

    componentDidMount() {
        this.fetchPagePosts()
        window.addEventListener("scroll", debounce(this.lazyLoader, 300));
        window.addEventListener("resize", debounce(this.lazyLoader, 300));
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", () => {});
        window.removeEventListener("resize", () => {});
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
