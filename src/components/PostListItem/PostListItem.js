import React from 'react'
import { Link } from 'react-router-dom'
import { useRouteMatch } from "react-router-dom"
import './PostListItem.scss'
import { selectPosts } from '../../reducers/posts/postsSlice'
import { useSelector, useStore } from 'react-redux'

const PostListItem = ({ postId, keyNo }) => {
    const posts = useSelector(selectPosts)
    const post = posts[postId]
    
    const calculateDate = (post) => {
        const date = new Date(post.created_utc * 1000)
        
        return date.toDateString()

    }
    calculateDate(post)
    let match = useRouteMatch("/r/pics")

    const renderThumbnail = (post) => {
        if (post.hasOwnProperty('preview')) {
            return (
                <div className="postlist-card-col-center">
                    <img className="postlist-card-thumbnail" src={post.thumbnail} alt={post.author_flair} width="140px" height="140px" />
                </div>
            )
        } else {
            return ""
        }
    }

    return (
        <div className="postlist-card">
            <div className="postlist-card-col-center">
                <span>{keyNo + 1}</span>
            </div>
            <div className="postlist-card-col-center">
                <span>{post.score}</span>
            </div>
            {renderThumbnail(post)}
            <div className="postlist-card-col">
                <div className="postlist-card-row">
                    <Link className="postlist-card-link" to={`${match.path}/${post.id}`} >
                        <div>{post.title}</div>
                    </Link>
                </div>
                <div className="postlist-card-row">
                    <span>submitted {post.created} by <span className="postlist-card-author">u/{post.author}</span>  to <span className="postlist-card-subreddit">r/{post.subreddit}</span></span>
                </div>
                <div className="postlist-card-metadata">
                    <span>icon - score {post.score}</span>
                    <span>{post.num_comments} Comments</span>
                </div>
            </div>
        </div>
    )
}

export default PostListItem
