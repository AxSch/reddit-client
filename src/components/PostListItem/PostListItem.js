import React from 'react'
import { Link } from 'react-router-dom'
import { useRouteMatch } from "react-router-dom"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp, faArrowCircleDown, faBomb, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { selectPosts } from '../../reducers/posts/postsSlice'
import { formatDate } from '../../helpers/helperFns'
import './PostListItem.scss'

const PostListItem = ({ postId, keyNo }) => {
    const posts = useSelector(selectPosts)
    const post = posts[postId]
    const postDate = formatDate(post.created)
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
                <FontAwesomeIcon icon={faArrowCircleUp} size="lg" />
                <span>{parseInt(post.score).toLocaleString()}</span>
                <FontAwesomeIcon icon={faArrowCircleDown} size="lg" />
            </div>
            {renderThumbnail(post)}
            <div className="postlist-card-col">
                <div className="postlist-card-row">
                    <Link className="postlist-card-link" to={`${match.path}/${post.id}`} >
                        <div>{post.title}</div>
                    </Link>
                </div>
                <div className="postlist-card-row">
                    <span>submitted {postDate.pDate} by <span className="postlist-card-author">u/{post.author}</span>  to <span className="postlist-card-subreddit">r/{post.subreddit}</span></span>
                </div>
                <div className="postlist-card-footer">
                    <div className="postlist-card-metadata">
                        <span><FontAwesomeIcon className="postlist-icon" icon={faBomb} />{parseInt(post.score).toLocaleString()}</span>
                        <span><FontAwesomeIcon className="postlist-icon" icon={faCommentAlt} />{parseInt(post.num_comments).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostListItem
