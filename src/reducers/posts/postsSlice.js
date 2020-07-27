
import { createSlice } from '@reduxjs/toolkit';
import { normalizeData } from '../../helpers/normalizeData';


const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        nextPage: '',
        postComments: null
    },
    reducers: {
        storePosts: (state, action) => {
            const data = [...action.payload]
            
            state.data = normalizeData(data)
        },
        setNextPage: (state, action) => {
            state.nextPage = action.payload
        },
        updatePosts: (state, action) => {
            const data = [...action.payload]
            const normalizedData = normalizeData(data)
            normalizedData.forEach(post => {
                state.data.push(post)
            })
        },
        storePostComments: (state, action) => {
            const post = action.payload
            state.postComments = post
        }
    }
})

export const selectPosts = state => state.posts.data

export const selectNextPage = state => state.posts.nextPage

export const selectPost = (state, postId) => state.posts.data.filter(post => post.id === postId)

export const selectPostComments = (state) => state.posts.postComments.children

export const { storePosts, setNextPage, updatePosts, storePostComments } = postsSlice.actions

export default postsSlice.reducer
