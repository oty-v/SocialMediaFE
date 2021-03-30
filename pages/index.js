import {createPost} from "../api";
import PostForm from "../components/postForm";

export default function Home() {
    return <PostForm  methodSendPost={createPost}/>
}