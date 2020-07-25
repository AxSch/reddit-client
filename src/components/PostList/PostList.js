import React from 'react'
import { useSelector } from 'react-redux'
import { selectPosts } from '../../reducers/posts/postsSlice'
import PostListItem from '../PostListItem/PostListItem'

const PostList = () => {
    const posts = useSelector(selectPosts)
    const renderPosts = posts => {
        if (posts) {
            return posts.map((post, key) => {
                return (
                    <PostListItem post={post} key={key} />
                )
            })
        } else {
            return ""
        }
    }
    return (
        <div>
            {renderPosts(posts)}
        </div>
    )
}

export default PostList
