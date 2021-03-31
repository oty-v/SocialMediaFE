import {useRouter} from "next/router";

import {createPost} from "../api";
import PostForm from "../components/postForm";

export default function Home() {
    const router = useRouter();
    const methodSendPost = async (inputs) => {
        const res = await createPost(inputs);
        if (!res.error) router.reload();
    }
    return <PostForm methodSendPost={methodSendPost}/>
}