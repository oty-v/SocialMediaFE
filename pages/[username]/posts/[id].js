import {useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {getPostComments} from "../../../api/comments";
import {withAuth} from "../../../lib/withAuth";
import CommentsList from "../../../components/comments/commentsList";
import Post from "../../../components/posts/post";
import CommentForm from "../../../components/comments/commentForm";
import {useDispatch, useSelector} from "react-redux";
import {removePostAsync, updatePostAsync, getPostAsync} from "../../../redux/posts/action";
import {createCommentAsync, removeComment, getCommentsAsync, updateComment} from "../../../redux/comments/action";
import {withRedux} from "../../../lib/withRedux";
import BackButton from "../../../components/common/BackButton";

const PostPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);
    const post = useSelector((state) => state.posts.post);
    const comments = useSelector((state) => state.comments.comments);
    const dispatch = useDispatch();
    const authUser = auth.profile.username;
    const onRemovePost = async (post) => {
        setLoading(true);
        try {
            await dispatch(removePostAsync(post.id, post.author.username));
            router.push(`/${post.author.username}/posts`);
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const onEditPost = async (post) => {
        setLoading(true);
        try {
            await dispatch(updatePostAsync(post.id, post));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const onRemoveComment = async (comment) => {
        setLoading(true);
        try {
            await dispatch(removeComment(comment.id, post.id));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const onEditComment = async (comment) => {
        setLoading(true);
        try {
            await dispatch(updateComment(comment.id, comment, post.id));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const onCreateComment = async (commentData) => {
        setLoading(true);
        try {
            await dispatch(createCommentAsync(post.id, commentData));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    return (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
            <div className="card central-column">
                <div className="card-header central-column-header">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3>Post</h3>
                    </div>
                </div>
                <div className="list-group list-group-flush card-body">
                    <div className="list-group-item">
                        <Post
                            onEdit={onEditPost}
                            onRemove={onRemovePost}
                            post={post}
                            showPostControls={authUser === post.author?.username}
                            loading={loading}
                        />
                        <div className="list-group-item">
                            <div className="mb-5">
                                <CommentForm onSubmit={onCreateComment}/>
                            </div>
                            <h4>Comments:</h4>
                            {comments?.length ? (
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
            </div>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    try {
        await dispatch(getPostAsync(ctx.query.id));
        await dispatch(getCommentsAsync(ctx.query.id));
        return {
            props: {
                postId: ctx.query.id
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