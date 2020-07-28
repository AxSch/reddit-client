import React from 'react'
import { useSelector } from 'react-redux'
import { selectPosts } from '../../reducers/posts/postsSlice'
import PostListItem from '../PostListItem/PostListItem'
import SkeletalLoading from '../SkeletalLoading/SkeletalLoading'

const PostList = () => {
    const posts = useSelector(selectPosts)

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

    const renderPostsSection = (posts) => {
        if (Object.keys(posts).length > 0) {
            return (
                <>
                    {renderPosts(posts)}
                    <SkeletalLoading type="posts-ext" />
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
