import {useRouter} from "next/router";
import Head from "next/head";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {deletePost, editPost, getPost} from "../../../api/posts";
import PostForm from "../../../components/posts/postForm";
import {withAuth} from "../../../lib/withAuth";

const PostPage = ({username, post}) => {
    const router = useRouter();
    const removePost = async (post) => {
        try {
            await deletePost(post.id);
            router.push(`/${username}/posts`);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const onEdit = async (inputs) => {
        try {
            await editPost(inputs);
            router.push(`/${username}/posts`);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    return (post ? (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
            <ToastContainer
                draggable={false}
                transition={Bounce}
                autoClose={5000}
            />
            <PostForm
                onSubmit={onEdit}
                initialPost={post}
            />
            <button onClick={() => {
                removePost(post)
            }}>
                Remove
            </button>
        </>
    ) : (
        <span>Loading...</span>
    ))
}

export const getServerSideProps = withAuth(async (ctx, auth) => {
    try {
        const {data: {data: post}} = await getPost(ctx.query.id);
        return {
            props: {
                username: ctx.query.username,
                post
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