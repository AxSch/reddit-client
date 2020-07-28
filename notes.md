### Notes

# Testing
Due to the time spent on this test, I have not included any tests. If I were to go about testing the application then I would start with the following:

* api.js (Unit)
- Testing whether the promises are properly resolved
- fail state

* Post.js (End to End)
- Testing the header is rendered with the correct data
- Testing the post body is rendered with the correct data
- Testing the CommentsList is rendered 
- Testing the SkeletalLoading is rendered when Comments are loading
- Test use case where post is not image based
- Test that certain functions have been called, like componentDidMount

* Posts.js (End to End)
- Testing the SkeletalLoading is rendered when posts are loading
- Test that certain functions have been called, like componentDidMount
- Check that the list renders succesfully
- check that the show more button triggers more posts to be rendered

* Unit tests can be done for the components using mock data

# Bugs & improvements

* Add some form of type safety through propTypes or Typescript

* Tests, Tests, TESTS!!!

* lint everything

* UI based filter for NSFW content

* Componentize the CommentList to use a CommentListItem component

* Add UI/UX for the show more button on the posts page

* Add functionality to share post