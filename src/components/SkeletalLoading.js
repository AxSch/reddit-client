import React from 'react'

const SkeletalLoading = (type) => {
    if (type === 'posts') {
        return (
            <div>
                Loading Posts...
            </div>
        )
    } else {
        return (
            <div>
                Loading Post...
            </div>
        )
    }
}

export default SkeletalLoading
