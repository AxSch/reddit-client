import React from 'react'

const CommentList = ({ comments }) => {
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
                <div key={key}>
                    <div>
                        {comment.author}
                        {comment.score}
                        {comment.created}
                    </div>
                    <div>
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
                    <div>Top comments {noOftopComments} </div>
                    {renderTopComments}
                </>
            )

        } else {
            return ""
        }
    }


    return (
        <div>
            {renderCommentsSection(comments)}
        </div>
    )
}

export default CommentList
