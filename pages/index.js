import {useState} from 'react';
import {useDispatch} from 'react-redux';
import Head from 'next/head';
import Link from 'next/link'
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PostForm from "../components/posts/postForm";
import UserList from "../components/users/usersList";
import {withAuth} from "../lib/withAuth";
import {getUsersAsync} from "../redux/users/action";
import {withRedux} from "../lib/withRedux";
import {createPostAsync} from "../redux/posts/action";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handlePostCreate = async (postData) => {
        setLoading(true);
        try {
            await dispatch(createPostAsync(postData));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const handleUserSearch = async (search) => {
        try {
            await dispatch(getUsersAsync(search.query));
        } catch (error) {
            toast.error(error.toString())
        }
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <div className="central-column">
                <div className="card-header central-column-header">
                    <h3 className="mb-0">Home</h3>
                </div>
                <div className="card-body">
                    <PostForm
                        onSubmit={handlePostCreate}
                        loading={loading}
                    />
                </div>
            </div>
            <div className="mx-5">
                <div className="my-3">
                    <h4>Users</h4>
                    <UserList
                        onSubmit={handleUserSearch}
                    />
                    <div className="d-inline-flex justify-content-center w-100">
                        <Link href="/users">
                            <a>Show more</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    try {
        await dispatch(getUsersAsync());
        return {
            props: {
                page: ctx.query
            }
        };
    } catch (e) {
        if (e.response.status === 404) {
            return {
                notFound: true,
            }
        }
    }
}))