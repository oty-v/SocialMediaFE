import Head from "next/head";

import {deletePost, editPost, getUserPosts} from "../../../api/posts";
import {useRouter} from "next/router";
import PostsList from "../../../components/posts/postList";
import {withAuth} from "../../../lib/withAuth";
import {toast} from "react-toastify";
import {storePostsListAction} from "../../../redux/actions/ActionCreator";
import {useDispatch, useSelector} from "react-redux";

function Posts() {
    const router = useRouter();
    const {auth, posts} = useSelector((state) => state);
    const dispatch = useDispatch();
    const removePost = async (modifiedPost) => {
        try {
            await deletePost(modifiedPost.id);
            const index = posts.findIndex(post=>post.id===modifiedPost.id);
            posts.splice(index, 1)
            dispatch(storePostsListAction([...posts]));
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const onEdit = async (modifiedPost) => {
        try {
            await editPost(modifiedPost);
            const index = posts.findIndex(post=>post.id===modifiedPost.id);
            posts.splice(index, 1, modifiedPost)
            dispatch(storePostsListAction([...posts]));
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const handleClickComments = (post) => {
        router.push(`/${post.author.username}/posts/${post.id}`)
    }
    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <code>{JSON.stringify(posts, null, 4)}</code>
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
        </>
    )

}

export const getServerSideProps = withAuth(async (ctx, dispatch, auth) => {
    try {
        const {data: {data: posts}} = await getUserPosts(ctx.query.username);
        dispatch(storePostsListAction(posts));
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
})

export default Posts;