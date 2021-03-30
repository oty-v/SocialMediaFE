import {editPost, getApiData} from "../../api";
import PostForm from "../../components/postForm";
import DelBtn from "../../components/delBtn";

const Post = ({post}) => {
    return (
        <>
            <PostForm  methodSendPost={editPost} sendPost={post}/>
            <DelBtn route={"/posts"} elementID={post.id}/>
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