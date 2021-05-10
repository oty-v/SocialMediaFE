import {useState} from "react";
import {useRouter} from "next/router";
import Head from 'next/head';

import {createPost} from "../api/posts";
import {getUsers} from "../api/users";
import PostForm from "../components/posts/postForm";
import UserList from "../components/users/usersList";
import {withAuth} from "../lib/withAuth";
import ToastMessage from "../components/common/toastMessage";

export default function Home({users}) {
    const [error, setError] = useState('');
    const router = useRouter();
    const onCreate = async (inputs) => {
        try {
            const {data: {data: post}} = await createPost(inputs);
            router.push(`${post.author.username}/posts/${post.id}`);
        } catch (error) {
            setError(error.toString())
        }
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <ToastMessage
                type='error'
                message={error}
                handleClick={()=>setError('')}
            />
            <PostForm onSubmit={onCreate}/>
            {!!users?.length && (
                <UserList users={users}/>
            )}
        </>
    )
}

export const getServerSideProps = withAuth(async (ctx, auth) => {
    try {
        const {data: {data: users}} = await getUsers();
        return {
            props: {
                users
            }
        };
    } catch (e) {
        if (e.response.status === 404) {
            return {
                notFound: true,
            }
        }
    }
})