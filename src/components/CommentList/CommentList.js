import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostComments } from '../../reducers/posts/postsSlice'
import './CommentList.scss'

const CommentList = () => {
    const comments = useSelector(selectPostComments)
    const calculateTopComments = comments => {
        const topComments = []
        let prevScore = 0
        let maxScore = 0
        if (comments.length > 0) {
            comments.forEach(comment => {
                if (comment.data.score > prevScore) {
                    prevScore = comment.data.score
                    if (prevScore > maxScore) {
                        maxScore = prevScore
                        topComments.push(comment.data)
                    }
                }

            })
        }
        return topComments
    }

    const renderComments = comments => {
        return comments.reverse().map((comment, key) => {
            return (
                <div className="comment" key={key}>
                    <div className="comment-metadata">
                        <span>{comment.author}</span>
                        <span>{comment.score}</span>
                        <span>{comment.created}</span>
                    </div>
                    <div className="comment-body">
                        {comment.body}
                    </div>
                </div>

            )
        })

    }

    const renderCommentsSection = comments => {
        if (comments !== [] && comments.length > 0) {
            const noOftopComments = calculateTopComments(comments).length
            const topComments = calculateTopComments(comments)
            const renderTopComments = renderComments(topComments)

            return (
                <>
                    <div className="comment-list-header">
                        <h4>Top comments - {noOftopComments} </h4
                    ></div>
                    {renderTopComments}
                </>
            )

        } else {
            return ""
        }
    }


    return (
        <div className="comment-list">
            {renderCommentsSection(comments)}
        </div>
    )
}

export default CommentList
