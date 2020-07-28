import { fetchAPI } from '../../api/api';

describe('api', () => {
    describe('fetchPost', () => {
        it ('should call the endpoint & successfully retrieve the results - no string', async () => {
            expect.assertions(2)
            return fetchAPI.fetchPosts().then(res => {
                expect(res.kind).toEqual('Listing')
                expect(res.data.dist).toEqual(25)
            })
        }, 3000)
        
        it ('should call the endpoint & successfully retrieve the results - string', async () => {
            expect.assertions(2)
            return fetchAPI.fetchPosts('t3_dcabzh').then(res => {
                expect(res.kind).toEqual('Listing')
                expect(res.data.dist).toEqual(25)
            })
        }, 3000) 
    });

    describe('fetchComments', () => {
        it ('should call the endpoint & successfully retrieve the results - no string', async () => {
            expect.assertions(1)
            return fetchAPI.fetchPostComments('haucpf').then(res => {
                expect(res.length).toEqual(2)
            })
        }, 3000)
        
        it ('should call the endpoint & successfully retrieve the results - string', async () => {
            const mockError = {"error": 404, "message": "Not Found"}
            expect.assertions(2)
            return fetchAPI.fetchPostComments().then(res => {
                expect(res).toEqual(mockError)
                expect(() => {throw new Error()}).toThrow()
            })
        }, 3000) 
    });

});
