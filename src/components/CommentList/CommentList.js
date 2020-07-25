import React from 'react'

const CommentList = ({ comments }) => {
    const renderComments = (comments) => {
        return comments.map((comment, key) => {
            return (
                <div key={key}>
                    Comment {key}
                </div>
            )
        })
        
    }
    
    return (
        <div>
            <div>
                header
            </div>
            <div>
                IMG
            </div>
            {renderComments(comments)}
        </div>
    )
}

export default CommentList
