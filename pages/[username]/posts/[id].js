import {useRouter} from "next/router";
import Head from "next/head";

import {axiosController} from "../../../lib/axiosController";
import {deletePost, editPost, getPost} from "../../../api/posts";
import PostForm from "../../../components/postForm";
import {useEffect} from "react";
import {parseCookies} from "../../../helpers/parseCookies";

const PostPage = ({username, post, isLoggedIn}) => {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push(`/login`);
        }
    }, [isLoggedIn]);
    const removePost = async (post) => {
        const {status} = await deletePost(post.id);
        if (status === 204) {
            router.push(`/${username}/posts`);
        }
    }
    const onEdit = async (inputs) => {
        const {status} = await editPost(inputs);
        if (status === 200) {
            router.push(`/${username}/posts`);
        }
    }
    return (post ? (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
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

export const getServerSideProps = async ({req, query}) => {
    const {token} = parseCookies(req);
    if (!token) {
        return {
            props: {
                isLoggedIn: false
            }
        };
    }
    axiosController.setToken(token);
    const {data, status} = await getPost(query.id);
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            isLoggedIn: true,
            username: query.username,
            post: data.data
        }
    };
}

export default PostPage