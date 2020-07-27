import React from 'react'
import { Link } from 'react-router-dom'
import { useRouteMatch } from "react-router-dom"
import './PostListItem.scss'

const PostListItem = ({ post, keyNo }) => {
    const calculateDate = (post) => {
        const date = new Date(post.created_utc * 1000)

        return date.toDateString()

    }
    calculateDate(post)
    let match = useRouteMatch("/r/pics")

    return (
        <div className="postlist-card">
            <div className="postlist-col-center">
                <span>{keyNo + 1}</span>
            </div>
            <div className="postlist-col-center">
                <span>{post.score}</span>
            </div>
            <div className="postlist-col-center">
                <img className="postlist-thumbnail" src={post.thumbnail} alt={post.title} width="140px" height="140px" />
            </div>
            <div className="postlist-col relative">
                <div className="postlist-row">
                    <Link className="postlist-link" to={`${match.path}/${post.id}`} >
                        <div>{post.title}</div>
                    </Link>
                </div>
                <div className="postlist-row">
                    <span>submitted {post.created} by <span className="postlist-author">u/{post.author}</span>  to <span className="postlist-subreddit">r/{post.subreddit}</span></span>
                </div>
                <div className="postlist-metadata">
                    <span>icon - score {post.score}</span>
                    <span>{post.num_comments} Comments</span>
                </div>
            </div>
        </div>
    )
}

export default PostListItem
