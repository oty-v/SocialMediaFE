import {useRouter} from "next/router";
import Head from 'next/head';

import {createPost} from "../api/posts";
import {getUsers} from "../api/users";
import PostForm from "../components/postForm";
import UserList from "../components/usersList";
import {withAuth} from "../lib/withAuth";

export default function Home({ users}) {
    const router = useRouter();
    const onCreate = async (inputs) => {
        const {data, status} = await createPost(inputs);
        if (status === 201) {
            router.push(`${data.data.author.username}/posts/${data.data.id}`);
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
    const {data, status} = await getUsers();
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            users: data.data
        }
    };
})