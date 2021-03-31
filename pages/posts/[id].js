import {useRouter} from "next/router";
import Head from "next/head";

import {deletePost, editPost, getApiData} from "../../api";
import PostForm from "../../components/postForm";

const PostPage = ({post}) => {
    const router = useRouter();
    const removePost = async () => {
        const res = await deletePost(post.id);
        if (!res.error) router.push('/posts');
    }
    const methodSendPost = async (inputs) => {
        const res = await editPost(inputs);
        if (!res.error) router.push('/posts');
    }
    return (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
            <PostForm methodSendPost={methodSendPost} sendPost={post}/>
            <button onClick={() => {
                removePost()
            }}>
                Remove
            </button>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const {id} = context.query;
    const res = await getApiData(`/posts/${id}`);
    if (res.error) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            post: res.data
        }
    };
}

export default PostPage