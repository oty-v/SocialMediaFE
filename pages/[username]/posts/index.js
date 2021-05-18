import Head from "next/head";

import {deletePost, editPost, getUserPosts} from "../../../api/posts";
import {useRouter} from "next/router";
import PostsList from "../../../components/posts/postList";
import {withAuth} from "../../../lib/withAuth";
import "react-toastify/dist/ReactToastify.css";
import {setPosts, updatePosts} from "../../../redux/posts/action";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {withRedux} from "../../../lib/withRedux";

function Posts() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();
    const onRemovePost = async (post) => {
        setLoading(true);
        dispatch(updatePosts(post, () => deletePost(post.id)));
        setLoading(false);
    }
    const onEditPost = (post) => {
        setLoading(true);
        dispatch(updatePosts(post, () => editPost(post.id, post)));
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
            <h2>Posts List</h2>
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
        </>
    )

}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    try {
        const {data: {data: posts}} = await getUserPosts(ctx.query.username);
        dispatch(setPosts(posts));
        return {
            props: {
                posts
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