import React from 'react'
import { Link} from 'react-router-dom'
import { useRouteMatch } from "react-router-dom"

const PostListItem = ({ post }) => {
    const calculateDate = (post) => { 
        const date = new Date(post.created_utc * 1000)

        return date.toDateString()

    }
    calculateDate(post)
    let match = useRouteMatch("/r/pics")

    return (
        <div>
            <div>Posted by u/{post.author}</div>
            <Link to={`${match.path}/${post.id}`} >
                <div>{post.title}</div>
            </Link>
            <div>
                <img src={post.thumbnail} alt={post.title} />
            </div>
            <div>
            <span>icon - score {post.score}</span>
            <span>{post.num_comments} Comments</span>
            </div>
        </div>
    )
}

export default PostListItem
