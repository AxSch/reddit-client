import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPosts, selectNextPage, updatePosts } from '../../reducers/posts/postsSlice'
import PostListItem from '../PostListItem/PostListItem'
import { fetchAPI } from '../../api/api'

const PostList = () => {
    const posts = useSelector(selectPosts)
    const dispatch = useDispatch()
    const nextPageString = useSelector(selectNextPage)

    const renderPosts = posts => {
        if (posts) {
            return posts.map((post, key) => {
                return (
                    <PostListItem post={post} key={key} keyNo={key}/>
                )
            })
        } else {
            return ""
        }
    }
    const fetchMorePosts = async () => {
        const posts = await fetchAPI.fetchPosts(nextPageString)
        dispatch(updatePosts(posts.data.children))
    }

    const renderPostsSection = (posts) => {
        if (posts.length > 0) {
            return (
                <>
                    {renderPosts(posts)}
                    <div>
                        <button onClick={fetchMorePosts}>Show More</button>
                    </div>
                </>
            )
        } else return ""
    }

    return (
        <div>
            {renderPostsSection(posts)}
        </div>
    )
}

export default PostList
