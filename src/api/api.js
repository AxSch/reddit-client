const fetchPosts = async (pageString) => {
    const url = `https://www.reddit.com/r/pics/top.json?t=all&after=${pageString}`
    const req = await fetch(url)
    const res  = await req.json()

    return res
}

const fetchPostComments = async (postID) => {
    const url = `https://www.reddit.com/r/pics/comments/${postID}.json`
    const req = await fetch(url)
    const res  = await req.json()
    return res
}

export const fetchAPI = {
    fetchPosts,
    fetchPostComments
}