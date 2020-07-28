import React, { Component, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { fetchAPI } from '../../api/api'
import SkeletalLoading from '../../components/SkeletalLoading/SkeletalLoading'
import ErrorBoundary from '../../ErrorBoundary'
import { selectPost, storePostComments } from '../../reducers/posts/postsSlice'
import { store } from '../../app/store'
import './Post.scss'
import { formatDate } from '../../helpers/helperFns';

const CommentList = lazy(() => import('../../components/CommentList/CommentList'))

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: null,
            isLoading: true,
        }
    }

    async fetchComments() {
        const { location } = this.props
        const { isLoading } = this.state
        try {
            const splitLocation = location.pathname.split('/')
            const postId = splitLocation[splitLocation.length - 1]
            const postComments = await fetchAPI.fetchPostComments(postId)
            store.dispatch(storePostComments(postComments[1].data))
            this.setState({ isLoading: !isLoading })
        } catch (error) {
            throw new Error("Comments could not be fetched at this time. Try again later.")
        }

    }

    componentDidMount() {
        const { location } = this.props
        const splitLocation = location.pathname.split('/')
        const postId = splitLocation[splitLocation.length - 1]

        this.fetchComments()
        const post = selectPost(store.getState(), postId)
        this.setState({ post: post })
    }

    checkHasImage(post) {
        if (post.hasOwnProperty('preview')) {
            return (
                <img className="post-img" src={post.url} alt={post.title} />
            )
        } else {
            const postRAW = ReactHtmlParser(post.selftext_html, { decodeEntities: true })
            const cleanedHTML = postRAW[0].split('<!-- SC_ON -->')
            const cleanedText = cleanedHTML[0].split('<!-- SC_OFF -->')
            const htmlText = cleanedText[1]


            return (
                <div>
                    {ReactHtmlParser(htmlText)}
                </div>
            )
        }
    }

    getPostAwards(post) {
        if (post.all_awardings && post.all_awardings.length > 0) {
            const countedAwards = {}

            const awards = post.all_awardings.map(item => {
                const awardObj = {
                    name: "",
                    desc: "",
                    url: "",
                }
                awardObj.name = item.name
                awardObj.desc = item.description
                awardObj.url = item.icon_url
                return awardObj
            })

            Object.values(awards).forEach(award => {
                const awardCategoryObj = {
                    ...award,
                    count: 1
                }
                if (countedAwards.hasOwnProperty(award.name)) {
                    countedAwards[award.name]["count"] += 1
                } else {
                    countedAwards[award.name] = awardCategoryObj
                }
            })
            return countedAwards
        }
    }

    renderAwards(awards) {
        if(awards) {
            return Object.values(awards).map((award, key) => {
                return (
                    <div className="post-awards-icons" key={key}>
                        <img src={award.url} alt={award.desc} width="24px" height="24px" />
                        <span>{award.count}</span>
                    </div>
                )
            })
        } else return ""
    }

    renderHeader(post) {
        const { location, history } = this.props
        const splitLocation = location.pathname.split('/')
        const previousPath = splitLocation.splice(1, splitLocation.length - 2).join("/")

        if (post) {
            const postAwards = this.getPostAwards(post)
            this.checkHasImage(post)
            const postDate = formatDate(post.created)

            return (
                <div>
                    <div>
                        <Link to="" onClick={() => history.push(previousPath)}>
                            Back
                        </Link>
                    </div>
                    <div className="post-header">
                        <div className="post-header-row">
                            <span>submitted on {postDate.pDate} at {postDate.pTime} by <span className="post-author">{post.author}</span></span>
                            {this.renderAwards(postAwards)}
                        </div>
                        <div className="post-header-row">
                            <h1>{post.title}</h1>
                        </div>
                    </div>
                    <div className="post-row-img">
                        {this.checkHasImage(post)}
                    </div>
                    <div className="post-header-row-actions">
                        <span><FontAwesomeIcon className="postlist-icon" icon={faArrowUp} />{parseInt(post.score).toLocaleString()}</span>
                        <span><FontAwesomeIcon className="postlist-icon" icon={faCommentAlt} />{parseInt(post.num_comments).toLocaleString()} Comments</span>
                    </div>
                </div>
            )
        } else return ""
    }

    render() {
        const { post, isLoading } = this.state
        let renderComments

        if (isLoading) {
            renderComments = <SkeletalLoading type="comments" />
        } else {
            renderComments = <CommentList />
        }

        return (
            <div className="post">
                <ErrorBoundary>
                    <Suspense fallback={<SkeletalLoading type="post" />}>
                        {this.renderHeader(post)}
                        {renderComments}
                    </Suspense>
                </ErrorBoundary>
            </div>
        )
    }
}

export default Post
