import {useRouter} from "next/router";
import Head from "next/head";

import {deletePost, editPost, getApiData} from "../../api";
import PostForm from "../../components/postForm";

const PostPage = ({post}) => {
    const router = useRouter();
    const removePost = async (post) => {
        const {status} = await deletePost(post.id);
        if (status === 204) {
            router.push('/posts');
        }
    }
    const onEdit = async (inputs) => {
        const {status} = await editPost(inputs);
        if (status === 200) {
            router.push('/posts');
        }
    }
    return (
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
    )
}

export const getServerSideProps = async (context) => {
    const {id} = context.query;
    const {data, status} = await getApiData(`/posts/${id}`);
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            post: data
        }
    };
}

export default PostPage