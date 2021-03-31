import {useRouter} from "next/router";

import {deletePost, editPost, getApiData} from "../../api";
import PostForm from "../../components/postForm";

const Post = ({post}) => {
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
            <PostForm methodSendPost={methodSendPost} sendPost={post}/>
            <button onClick={() => {
                removePost()
            }}>
                Remove
            </button>
        </>
    )
}

export const getStaticPaths = async () => {
    const res = await getApiData('/posts');
    const paths = res.data.map((post) => ({
        params: {id: post.id.toString()}
    }))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params}) => {
    const res = await getApiData(`/posts/${params.id}`);
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

export default Post