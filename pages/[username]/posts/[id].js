import {useRouter} from "next/router";
import Head from "next/head";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {deletePost, getPost} from "../../../api/posts";
import {deleteComment, editComment, getPostComments} from "../../../api/comments";
import {withAuth} from "../../../lib/withAuth";
import CommentsList from "../../../components/comments/commentsList";
import Post from "../../../components/posts/post";
import CommentForm from "../../../components/comments/commentForm";
import {useDispatch, useSelector} from "react-redux";
import {setPost, updatePost, updatePosts} from "../../../redux/posts/action";
import {addComments, setComments, updateComments} from "../../../redux/comments/action";
import {useState} from "react";
import {withRedux} from "../../../lib/withRedux";

const PostPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);
    const post = useSelector((state) => state.posts.posts);
    const comments = useSelector((state) => state.comments.comments);
    const dispatch = useDispatch();
    const onRemovePost = async (post) => {
        setLoading(true);
        try {
            await deletePost(post.id);
            router.push(`/${post.author.username}/posts`);
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const onEditPost = (post) => {
        setLoading(true);
        dispatch(updatePost(post));
        setLoading(false);
    }
    const onRemoveComment = (comment) => {
        setLoading(true);
        dispatch(updateComments(post.id, () => deleteComment(comment.id)));
        setLoading(false);
    }
    const onEditComment = async (comment) => {
        setLoading(true);
        dispatch(updateComments(post.id, () => editComment(comment.id, comment)));
        setLoading(false);
    }
    const onCreateComment = async (inputs) => {
        setLoading(true);
        dispatch(addComments(post.id, inputs));
        setLoading(false);
    }
    return (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
            <div className="list-group w-75">
                <div className="list-group-item list-group-item-action">
                    <Post
                        onEdit={onEditPost}
                        onRemove={onRemovePost}
                        post={post}
                        showPostControls={auth.user.username === post.author?.username}
                        loading={loading}
                    />
                    <div className="list-group-item list-group-item-action">
                        <h6>Comments:</h6>
                        <CommentForm onSubmit={onCreateComment}/>
                        {!!comments?.length ? (
                            <CommentsList
                                onEditComment={onEditComment}
                                onRemoveComment={onRemoveComment}
                                loading={loading}
                            />
                        ) : (
                            <span>No Comments</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    try {
        const {data: {data: post}} = await getPost(ctx.query.id);
        const {data: {data: comments}} = await getPostComments(ctx.query.id);
        dispatch(setPost(post));
        dispatch(setComments(comments));
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
}))

export default PostPage