import {useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {withAuth} from "../../../lib/withAuth";
import CommentsList from "../../../components/comments/commentsList";
import Post from "../../../components/posts/post";
import CommentForm from "../../../components/comments/commentForm";
import {useDispatch, useSelector} from "react-redux";
import {removePostAsync, updatePostAsync, getPostAsync, fetchPost} from "../../../redux/posts/action";
import {
    createCommentAsync,
    removeCommentAsync,
    getCommentsAsync,
    updateCommentAsync
} from "../../../redux/comments/action";
import {withRedux} from "../../../lib/withRedux";
import BackButton from "../../../components/common/BackButton";
import {useQuery} from "@redux-requests/react";

const PostPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {data:{username:authUser}} = useQuery({ type: 'FETCH_PROFILE' });
    const {data:post} = useQuery({ type: 'FETCH_POST' });
    const dispatch = useDispatch();
    const handlePostRemove = async (post) => {
        setLoading(true);
        try {
            await dispatch(removePostAsync(post.id, post.author.username));
            router.push(`/${post.author.username}/posts`);
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const handlePostEdit = async (post) => {
        setLoading(true);
        try {
            await dispatch(updatePostAsync(post.id, post));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const handleCommentRemove = async (comment) => {
        setLoading(true);
        try {
            await dispatch(removeCommentAsync(comment.id));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const handleCommentEdit = async (comment) => {
        setLoading(true);
        try {
            await dispatch(updateCommentAsync(comment.id, comment));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const handleCommentCreate = async (commentData) => {
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
                            loading={loading}
                        />
                    </div>
                    <div className="list-group-item">
                        <div className="mb-5">
                            <CommentForm onSubmit={handleCommentCreate}/>
                        </div>
                        <h4>Comments:</h4>
                        <CommentsList
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
            username: ctx.query.username
        }
    };
    // try {
    //     await dispatch(getPostAsync(ctx.query.id));
    //     await dispatch(getCommentsAsync(ctx.query.id));
    //     return {
    //         props: {
    //             postId: ctx.query.id
    //         }
    //     };
    // } catch (e) {
    //     if (e.response.status === 404) {
    //         return {
    //             notFound: true,
    //         }
    //     }
    // }
}))

export default PostPage