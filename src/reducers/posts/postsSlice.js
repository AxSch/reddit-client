
import { createSlice } from '@reduxjs/toolkit';
import { normalizeData } from '../../helpers/normalizeData';


const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        postsData: {},
        nextPage: '',
        postComments: null
    },
    reducers: {
        storePosts: (state, action) => {
            const data = [...action.payload]

            const normalizedData = normalizeData(data)
            
            state.postsData = normalizedData
        },
        setNextPage: (state, action) => {
            state.nextPage = action.payload
        },
        updatePosts: (state, action) => {
            const data = [...action.payload]
            const normalizedData = normalizeData(data)
            
            state.postsData = {...state.postsData, ...normalizedData}
        },
        storePostComments: (state, action) => {
            const postComments = action.payload["children"]
            const normalizedData = normalizeData(postComments)

            state.postComments = normalizedData
        }
    }
})

export const selectPosts = state => state.posts.postsData

export const selectNextPage = state => state.posts.nextPage

export const selectPost = (state, postId) => state.posts.postsData[postId]

export const selectPostComments = (state) => state.posts.postComments

export const { storePosts, setNextPage, updatePosts, storePostComments } = postsSlice.actions

export default postsSlice.reducer
