import {useRouter} from "next/router";
import Head from "next/head";

import {api, deletePost, editPost, getPost} from "../../../lib/api";
import PostForm from "../../../components/postForm";
import {useEffect} from "react";
import {parseCookies} from "../../../lib/parseCookies";

const PostPage = ({token, username, post, isLoggedIn}) => {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push(`/login`);
        }
    });
    const removePost = async (post) => {
        api.interceptors.request.use((config) => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        }, (error) => {
            return error.response
        });
        const {status} = await deletePost(post.id);
        if (status === 204) {
            router.push(`/${username}/posts`);
        }
    }
    const onEdit = async (inputs) => {
        api.interceptors.request.use((config) => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        });
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
    api.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        return error.response
    });
    const {data, status} = await getPost(query.id);
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            isLoggedIn: true,
            token: token,
            username: query.username,
            post: data.data
        }
    };
}

export default PostPage