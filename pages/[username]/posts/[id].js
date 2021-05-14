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
import {useSelector} from "react-redux";
import {storeCommentsListAction} from "../../../redux/actions/ActionCreator";

const PostPage = ({auth, post, comments}) => {
    const router = useRouter();
    const state = useSelector((state) => state);
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
            router.push(`/${post.author.username}/posts`);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const removeComment = async (comment) => {
        try {
            await deleteComment(comment.id);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const onEditComment = async (inputs) => {
        try {
            await editComment(inputs);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const onCreateComment = async (inputs) => {
        try {
            await createComment(post.id, inputs);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    return (post ? (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>

            <code>{JSON.stringify(state, null, 4)}</code>
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
        const {data: {data: comments}} = await getPostComments(ctx.query.id)
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