import {useRouter} from "next/router";
import Head from 'next/head';

import {createPost} from "../api";
import PostForm from "../components/postForm";

export default function Home() {
    const router = useRouter();
    const onCreate = async (inputs) => {
        const {data, status} = await createPost(inputs);
        if (status===201) {
            router.push(`/posts/${data.id}`);
        }
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <PostForm onSubmit={onCreate}/>
        </>
    )
}