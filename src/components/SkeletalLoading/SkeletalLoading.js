import React from 'react'
import './SkeletalLoading.scss'

const SkeletalLoading = ({ type }) => {
    const renderPostsSkeleton = (amount) => {
        const postCards = []
        for (let i = 0; i < amount; i++) {
            postCards.push(<div className="postlist-card-dummy" key={i} />)
        }
        return postCards

    }

    const renderBlock = (amount, isShowHeader=true) => {
        const skeletonCards = renderPostsSkeleton(amount)
        return (
            <>
                {isShowHeader ? <div className="posts-header-dummy" /> : ""}
                <div className="postlist-col">
                    {skeletonCards}
                </div>
            </>
        )
    }
    
    switch (type) {
        case "post":
            return renderBlock(3)
        case "posts":
            return renderBlock(6)
        case "posts-ext":
            return renderBlock(3, false)
        case "comments":
            return renderBlock(2)
        default:
            return ""
    }

}

export default SkeletalLoading
