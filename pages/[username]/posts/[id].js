import {useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";

import {deletePost, editPost, getPost} from "../../../api/posts";
import PostForm from "../../../components/posts/postForm";
import {withAuth} from "../../../lib/withAuth";
import ToastMessage from "../../../components/common/toastMessage";

const PostPage = ({username, post}) => {
    const [error, setError] = useState('');
    const router = useRouter();
    const removePost = async (post) => {
        try {
            await deletePost(post.id);
            router.push(`/${username}/posts`);
        } catch (error) {
            setError(error.toString())
        }
    }
    const onEdit = async (inputs) => {
        try {
            await editPost(inputs);
            router.push(`/${username}/posts`);
        } catch (error) {
            setError(error.toString())
        }
    }
    return (post ? (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
            <ToastMessage type='error' message={error} handleClick={()=>setError('')}/>
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