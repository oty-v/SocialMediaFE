import {useCallback} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {useQuery} from "@redux-requests/react";
import {useDispatch} from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import {withAuth} from "../../../lib/withAuth";
import CommentsList from "../../../components/comments/commentsList";
import Post from "../../../components/posts/post";
import CommentForm from "../../../components/comments/commentForm";
import {deletePost, fetchPost, updatePost} from "../../../redux/posts/action";
import {createComment, deleteComment, updateComment,} from "../../../redux/comments/action";
import {withRedux} from "../../../lib/withRedux";
import BackButton from "../../../components/common/BackButton";
import {fetchProfile} from "../../../redux/auth/action";
import Loader from "../../../components/common/Loader";

const PostPage = ({username, postId}) => {
    const router = useRouter();
    const {data: {username: authUser}} = useQuery({type: fetchProfile});
    const {data: post, loading} = useQuery({type: fetchPost, requestKey: postId});
    if (loading) {
        return <Loader/>
    }
    if (!post) {
        router.push(`/${username}/posts`)
        return <Loader/>
    }
    const dispatch = useDispatch();

    const handlePostRemove = useCallback((postId) => {
        dispatch(deletePost(postId));
    }, []);

    const handlePostEdit = useCallback((postUpdate, postId) => {
        dispatch(updatePost(postUpdate, postId));
    },[]);

    const handleCommentRemove = useCallback((comment) => {
        dispatch(deleteComment(post.id, comment.id));
    },[post.id]);

    const handleCommentEdit = useCallback((comment) => {
        dispatch(updateComment(post.id, comment.id, comment));
    }, [post.id]);

    const handleCommentCreate = useCallback((commentData) => {
        dispatch(createComment(post.id, commentData));
    },[post.id]);

    return (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
            <div className="central-column">
                <div className="card-header central-column-header bg-transparent">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3>Post</h3>
                    </div>
                </div>
                <div className="list-group list-group-flush card-body">
                    <div className="list-group-item">
                        <Post
                            onEdit={handlePostEdit}
                            onRemove={handlePostRemove}
                            post={post}
                            showPostControls={authUser === post.author?.username}
                        />
                    </div>
                    <div className="list-group-item">
                        <div className="mb-5">
                            <CommentForm onSubmit={handleCommentCreate}/>
                        </div>
                        <h4>Comments:</h4>
                        <CommentsList
                            comments={post.comments}
                            onEditComment={handleCommentEdit}
                            onRemoveComment={handleCommentRemove}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    const {error} = await dispatch(fetchPost(ctx.query.id));
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