import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPosts, selectNextPage, updatePosts, setNextPage } from '../../reducers/posts/postsSlice'
import PostListItem from '../PostListItem/PostListItem'
import { fetchAPI } from '../../api/api'
import './PostList.scss'

const PostList = () => {
    const posts = useSelector(selectPosts)
    const dispatch = useDispatch()
    const nextPageString = useSelector(selectNextPage)

    const renderPosts = posts => {
        if (posts) {
            return Object.keys(posts).map((post, key) => {
                return (
                    <PostListItem postId={post} key={key} keyNo={key}/>
                )
            })
        } else {
            return ""
        }
    }
    
    const fetchMorePosts = async () => {
        const posts = await fetchAPI.fetchPosts(nextPageString)
        dispatch(updatePosts(posts.data.children))
        dispatch(setNextPage(posts.data.after))
    }

    const renderPostsSection = (posts) => {
        if (Object.keys(posts).length > 0) {
            return (
                <>
                    {renderPosts(posts)}
                    <div className="postlist-row">
                        <button className="postlist-button" onClick={fetchMorePosts}>Show More</button>
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
