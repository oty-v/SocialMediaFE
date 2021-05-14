import Head from "next/head";

import {deletePost, editPost, getUserPosts} from "../../../api/posts";
import {useRouter} from "next/router";
import PostsList from "../../../components/posts/postList";
import {withAuth} from "../../../lib/withAuth";
import {toast} from "react-toastify";
import {storePostsListAction} from "../../../redux/actions/ActionCreator";
import {useSelector} from "react-redux";

function Posts({auth, username, posts}) {
    const router = useRouter();
    const state = useSelector((state) => state);
    const removePost = async (post) => {
        try {
            await deletePost(post.id);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const onEdit = async (inputs) => {
        try {
            await editPost(inputs);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const handleClickComments = (post) => {
        router.push(`/${username}/posts/${post.id}`)
    }
    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <h2>Posts List</h2>
            {!!posts?.length ? (
                <PostsList
                    posts={posts}
                    removePost={removePost}
                    onEdit={onEdit}
                    handleClickComments={handleClickComments}
                    authUser={auth.user.username}
                />
            ) : (
                <span>No posts</span>
            )}
            <code>{JSON.stringify(state, null, 4)}</code>
        </>
    )

}

export const getServerSideProps = withAuth(async (ctx, dispatch, auth) => {
    try {
        const {data: {data: posts}} = await getUserPosts(ctx.query.username);
        dispatch(storePostsListAction(posts));
        return {
            props: {
                username: ctx.query.username,
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
})

export default Posts;