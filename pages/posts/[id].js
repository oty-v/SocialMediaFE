import {getApiData} from "../../api";
import BasePage from "../../components/basePage";
import PostForm from "../../components/postForm";
import PostDelBtn from "../../components/postDelBtn";

const Post = ({post}) => {
    return (
        <BasePage pageTitle={`Post: ${post.id}`}>
            <PostForm post={post}/>
            <PostDelBtn postID={post.id}/>
        </BasePage>
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


    return {props: {post: res.data}};
}

export default Post