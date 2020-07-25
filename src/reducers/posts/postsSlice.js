
import { createSlice } from '@reduxjs/toolkit';


const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        nextPage: ''
    },
    reducers: {
        storePosts: (state, action) => {
            const data = [...action.payload]
            const filteredData = data.filter(element => element.data["over_18"] === false) 
            const normalizedData = []
            let dataObj = {}
            filteredData.forEach(element => {
                dataObj = element.data
                normalizedData.push(dataObj)
                
            })
            state.data = normalizedData
        },
        setNextPage: (state, action) => {
            state.nextPage = action.payload
        },
    }
})

export const selectPosts = state => state.posts.data

export const { storePosts, setNextPage } = postsSlice.actions

export default postsSlice.reducer
