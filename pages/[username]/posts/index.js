import {useState} from "react";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useRouter} from "next/router";
import PostsList from "../../../components/posts/postList";
import {withAuth} from "../../../lib/withAuth";
import {removePost, updatePost, uploadPosts} from "../../../redux/posts/action";
import {withRedux} from "../../../lib/withRedux";
import BackButton from "../../../components/common/BackButton";

function Posts({username}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();
    const onRemovePost = async (post) => {
        setLoading(true);
        try {
            await dispatch(removePost(post.id, post.author.username));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const onEditPost = async (post) => {
        setLoading(true);
        try {
            await dispatch(updatePost(post.id, post));
            await dispatch(uploadPosts(post.author.username));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const handleClickComments = (post) => {
        router.push(`/${post.author.username}/posts/${post.id}`)
    }
    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <div className="card central-column">
                <div className="card-header central-column-header">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3 className="mb-0">Posts List</h3>
                        <span className="text-muted">{`@${username}`}</span>
                    </div>
                </div>
                <div className="card-body">
                    {!!posts?.length ? (
                        <PostsList
                            onRemovePost={onRemovePost}
                            onEditPost={onEditPost}
                            handleClickComments={handleClickComments}
                            loading={loading}
                        />
                    ) : (
                        <span>No posts</span>
                    )}
                </div>
            </div>
        </>
    )

}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    try {
        await dispatch(uploadPosts(ctx.query.username));
        return {
            props: {
                username: ctx.query.username
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

export default Posts;