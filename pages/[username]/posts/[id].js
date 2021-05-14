import {useRouter} from "next/router";
import Head from "next/head";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {deletePost, editPost, getPost} from "../../../api/posts";
import {createComment, deleteComment, editComment, getPostComments} from "../../../api/comments";
import {withAuth} from "../../../lib/withAuth";
import CommentsList from "../../../components/comments/commentsList";
import Post from "../../../components/posts/post";
import CommentForm from "../../../components/comments/commentForm";
import {useDispatch, useSelector} from "react-redux";
import {storeCommentsListAction, storePostAction} from "../../../redux/actions/ActionCreator";

const PostPage = () => {
    const router = useRouter();
    const {auth, post, comments} = useSelector((state) => state);
    const dispatch = useDispatch();
    const removePost = async (post) => {
        try {
            await deletePost(post.id);
            router.push(`/${post.author.username}/posts`);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const onEdit = async (inputs) => {
        try {
            await editPost(inputs);
            dispatch(storePostAction(inputs));
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const removeComment = async (modifiedComment) => {
        try {
            await deleteComment(modifiedComment.id);
            const index = comments.findIndex(comment => comment.id === modifiedComment.id);
            comments.splice(index, 1)
            dispatch(storeCommentsListAction([...comments]));
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const onEditComment = async (modifiedComment) => {
        try {
            await editComment(modifiedComment);
            const index = comments.findIndex(comment => comment.id === modifiedComment.id);
            comments.splice(index, 1, modifiedComment)
            dispatch(storeCommentsListAction([...comments]));
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const onCreateComment = async (inputs) => {
        try {
            const {data: {data: comment}} = await createComment(post.id, inputs);
            comments.push(comment)
            dispatch(storeCommentsListAction([...comments]));
        } catch (error) {
            toast.error(error.toString())
        }
    }
    return (post ? (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
            <ul className="list-group w-75">
                <li className="list-group-item list-group-item-action">
                    <Post
                        onEdit={onEdit}
                        removePost={removePost}
                        post={post}
                        showPostControls={auth.user.username === post.author.username}
                    />
                    <li className="list-group-item list-group-item-action">
                        <h6>Comments:</h6>
                        <CommentForm onSubmit={onCreateComment}/>
                        {!!comments?.length ? (
                            <CommentsList
                                comments={comments}
                                authUser={auth.user.username}
                                onEditComment={onEditComment}
                                removeComment={removeComment}
                            />
                        ) : (
                            <span>No Comments</span>
                        )}
                    </li>
                </li>
            </ul>
        </>
    ) : (
        <span>Loading...</span>
    ))
}

export const getServerSideProps = withAuth(async (ctx, dispatch, auth) => {
    try {
        const {data: {data: post}} = await getPost(ctx.query.id);
        const {data: {data: comments}} = await getPostComments(ctx.query.id);
        dispatch(storePostAction(post));
        dispatch(storeCommentsListAction(comments));
        return {
            props: {
                post,
                comments
            }
        };
    } catch (e) {
        if (e.response.status === 404) {
            return {
                notFound: true,
            }
        }
    }
})

export default PostPage