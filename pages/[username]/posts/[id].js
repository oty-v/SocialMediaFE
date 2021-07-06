import {useCallback} from "react";
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
import MiddleContent from "../../../components/common/layout/content/MiddleContent";
import CenterInScreen from "../../../components/common/CenterInScreen";

const PostPage = ({username, postId}) => {
    const router = useRouter();
    const {data: {username: authUser}} = useQuery({type: fetchProfile});
    const {data: post, loading} = useQuery({type: fetchPost, requestKey: postId});
    const {loading: loadingCreate} = useMutation({type: createComment, requestKey: postId})
    const dispatch = useDispatch();

    const handlePostRemove = useCallback((postId) => {
        dispatch(deletePost(postId));
    }, []);

    const handlePostEdit = useCallback((postUpdate, postId) => {
        dispatch(updatePost(postUpdate, postId));
    }, []);

    const handleCommentCreate = useCallback((commentData) => {
        dispatch(createComment(postId, commentData));
    }, []);

    if (loading) {
        return (
            <CenterInScreen>
                <Loader/>
            </CenterInScreen>
        )
    }
    if (!post) {
        router.push(`/${username}/posts`)
        return (
            <CenterInScreen>
                <Loader/>
            </CenterInScreen>
        )
    }

    return (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
            <MiddleContent
                backBtn
                title={'Post'}
            >
                <MiddleContent.Body>
                    <MiddleContent.Item>
                        <Post
                            onEdit={handlePostEdit}
                            onRemove={handlePostRemove}
                            post={post}
                            showPostControls={authUser === post.author?.username}
                        />
                    </MiddleContent.Item>
                    <MiddleContent.Item>
                        <div className="mb-5">
                            <CommentForm onSubmit={handleCommentCreate} loading={loadingCreate}/>
                        </div>
                        <h4>Comments:</h4>
                        <CommentsList
                            postId={post.id}
                        />
                    </MiddleContent.Item>
                </MiddleContent.Body>
            </MiddleContent>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    const {error: errorPost} = await dispatch(fetchPost(ctx.query.id));
    const {error: errorComments} = await dispatch(fetchPostComments(ctx.query.id))
    const error = errorPost || errorComments;
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