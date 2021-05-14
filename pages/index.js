import {useRouter} from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import Head from 'next/head';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {createPost} from "../api/posts";
import {getUsers} from "../api/users";
import PostForm from "../components/posts/postForm";
import UserList from "../components/users/usersList";
import {withAuth} from "../lib/withAuth";
import {storeUsersListAction} from "../redux/actions/ActionCreator";

export default function Home({users}) {
    const router = useRouter();
    const state = useSelector((state) => state);
    const onCreate = async (inputs) => {
        try {
            const {data: {data: post}} = await createPost(inputs);
            router.push(`${post.author.username}/posts/${post.id}`);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <h2>Home</h2>
            <PostForm onSubmit={onCreate}/>
            {!!users?.length && (
                <UserList users={users}/>
            )}
            <code>{JSON.stringify(state, null, 4)}</code>
        </>
    )
}

export const getServerSideProps = withAuth(async (ctx, dispatch, auth) => {
    try {
        const {data: {data: users}} = await getUsers();
        dispatch(storeUsersListAction(users));
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