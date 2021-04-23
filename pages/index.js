import {useRouter} from "next/router";
import Head from 'next/head';

import {createPost} from "../lib/api";
import PostForm from "../components/postForm";
import {useEffect} from "react";

export default function Home({isLoggedIn}) {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push(`/login`);
        }
    });
    const onCreate = async (inputs) => {
        const {data, status} = await createPost(inputs);
        if (status === 201) {
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