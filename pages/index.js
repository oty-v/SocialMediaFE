import {useState} from 'react'
import {useRouter} from "next/router";
import {useSelector} from 'react-redux';
import Head from 'next/head';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {createPost} from "../api/posts";
import {getUsers} from "../api/users";
import PostForm from "../components/posts/postForm";
import UserList from "../components/users/usersList";
import {withAuth} from "../lib/withAuth";
import {storeUsersListAction} from "../redux/actions/ActionCreator";

export default function Home() {
    const router = useRouter();
    const [waitDispatch, setWaitDispatch] = useState(false);
    const {users} = useSelector((state) => state);
    const onCreate = async (inputs) => {
        setWaitDispatch(true);
        try {
            const {data: {data: post}} = await createPost(inputs);
            router.push(`${post.author.username}/posts/${post.id}`);
        } catch (error) {
            toast.error(error.toString())
        }
        setWaitDispatch(false);
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <h2>Home</h2>
            <PostForm
                onSubmit={onCreate}
                waitDispatch={waitDispatch}
            />
            {!!users?.length && (
                <UserList users={users}/>
            )}
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