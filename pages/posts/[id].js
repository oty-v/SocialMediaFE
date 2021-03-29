import { getApiData } from "../../api";
import PostForm from "../../components/postForm";
import PostDelBtn from "../../components/postDelBtn";

const Post = ({post}) => {
    return (
        <>
            <PostForm post={post}/>
            <PostDelBtn postID={post.id}/>
        </>
    )
}

export const getStaticPaths = async () => {
    const res = await getApiData('/posts');
    const paths = res.data.map((post) => ({
        params: { id: post.id.toString() }
    }))
    return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
    const res = await getApiData(`/posts/${params.id}`);
    if (res.error) {
        return {
            notFound: true,
        }
    }


    return {props: {post: res.data}};
}

export default Post