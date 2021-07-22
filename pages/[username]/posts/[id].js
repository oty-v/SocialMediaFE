import {useRouter} from "next/router";
import Head from "next/head";
import {useMutation, useQuery} from "@redux-requests/react";
import {useDispatch} from "react-redux";

import {withAuth} from "../../../lib/withAuth";
import CommentsList from "../../../components/comments/commentsList";
import Post from "../../../components/posts/post";
import CommentForm from "../../../components/comments/commentForm";
import {deletePost, fetchPost, updatePost} from "../../../redux/posts/action";
import {createComment, fetchPostComments} from "../../../redux/comments/action";
import {withRedux} from "../../../lib/withRedux";
import {fetchProfile} from "../../../redux/auth/action";
import Loader from "../../../components/common/Loader";
import MainContent from "../../../components/common/layout/content/MainContent";
import CenterInScreen from "../../../components/common/CenterInScreen";
import {fetchMentions, fetchUserFollowings} from "../../../redux/users/action";

const PostPage = ({username, postId}) => {
    const router = useRouter();
    const {data: {username: authUser}} = useQuery({type: fetchProfile});
    const {data: post} = useQuery({type: fetchPost, requestKey: postId});
    const {loading: loadingCreate} = useMutation({type: createComment, requestKey: postId});

    if (!post) {
        router.push(`/${username}/posts`)
        return (
            <CenterInScreen customClassName="vh-100">
                <Loader/>
            </CenterInScreen>
        )
    }

    const dispatch = useDispatch();

    const handlePostRemove = (postId) => {
        dispatch(deletePost(postId));
    };

    const handlePostEdit = (postUpdate, postId) => {
        dispatch(updatePost(postUpdate, postId));
    };

    const handleCommentCreate = (commentData) => {
        dispatch(createComment(postId, commentData));
    };

    return (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
            <MainContent
                backBtn
                title="Post"
            >
                <MainContent.Body>
                    <MainContent.Item>
                        <Post
                            onEdit={handlePostEdit}
                            onRemove={handlePostRemove}
                            post={post}
                            showPostControls={authUser === post.author?.username}
                        />
                    </MainContent.Item>
                    <MainContent.Item>
                        <div className="mb-5">
                            <CommentForm onSubmit={handleCommentCreate} loading={loadingCreate}/>
                        </div>
                        <h4>Comments:</h4>
                        <CommentsList
                            postId={post.id}
                        />
                    </MainContent.Item>
                </MainContent.Body>
            </MainContent>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch, auth) => {
    const {error: errorPost} = await dispatch(fetchPost(ctx.query.id));
    const {error: errorComments} = await dispatch(fetchPostComments(ctx.query.id));
    const {error: errorUserFollowings} = await dispatch(fetchUserFollowings(auth.user.username));
    const {error: errorMentions} = await dispatch(fetchMentions());
    const error = errorPost || errorComments || errorUserFollowings || errorMentions;
    if (error?.response.status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            username: ctx.query.username,
            postId: ctx.query.id
        }
    };
}))

export default PostPage