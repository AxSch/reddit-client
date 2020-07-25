import React, { Component } from 'react'
import { fetchAPI } from '../../api/api'
import { storePosts, setNextPage } from '../../reducers/posts/postsSlice'
import store from '../../app/store'
import PostList from '../../components/PostList/PostList'

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    async fetchAllPosts() {
        const posts  = await fetchAPI.fetchPosts()
        store.dispatch(storePosts(posts.data.children))
        store.dispatch(setNextPage(posts.data.after))
        this.setState({ loading: !this.state.loading })

    }

    componentDidMount() {
        this.fetchAllPosts()
    }

    render() {
        const { loading } = this.state

        return (
            <>
                {!loading ? <PostList /> : <div>Lazy loading...</div>}
            </>
        )
    }
}

export default Posts
