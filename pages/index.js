import {useRouter} from "next/router";
import Head from 'next/head';

import {createPost} from "../api/posts";
import {getUsers} from "../api/users";
import PostForm from "../components/postForm";
import UserList from "../components/usersList";
import {withAuth} from "../lib/withAuth";

export default function Home({users}) {
    const router = useRouter();
    const onCreate = async (inputs) => {
        try {
            const {data} = await createPost(inputs);
            router.push(`${data.data.author.username}/posts/${data.data.id}`);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <PostForm onSubmit={onCreate}/>
            {!!users?.length && (
                <UserList users={users}/>
            )}
        </>
    )
}

export const getServerSideProps = withAuth(async (ctx, token) => {
    const {data} = await getUsers();
    return {
        props: {
            users: data.data
        }
    };
})