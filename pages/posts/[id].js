import {useState} from "react";
import {editPost, getApiData} from "../../api";
import PostForm from "../../components/postForm";
import DelBtn from "../../components/delBtn";

const Post = ({post}) => {
    const [inputs, setInputs] = useState({
        username: post.username,
        content: post.content
    });
    const useEditForm = () => {
        const handleSubmit = (event) => {
            if (event) {
                event.preventDefault();
            }
            editPost(post.id, inputs);
        }
        const handleInputChange = (event) => {
            event.persist();
            setInputs(inputs => ({
                ...inputs,
                [event.target.name]: event.target.value
            }));
        }
        return {
            handleSubmit,
            handleInputChange,
            inputs
        };
    }
    return (
        <>
            <PostForm sendPost={useEditForm}/>
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