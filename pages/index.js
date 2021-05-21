import {useState} from 'react'
import {useRouter} from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import Head from 'next/head';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {createPost} from "../api/posts";
import PostForm from "../components/posts/postForm";
import UserList from "../components/users/usersList";
import {withAuth} from "../lib/withAuth";
import {getUsersAsync} from "../redux/users/action";
import {withRedux} from "../lib/withRedux";
import {createPostAsync} from "../redux/posts/action";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const users = useSelector((state) => state.users.users);
    const authUsername = useSelector((state) => state.auth.profile.username);
    const dispatch = useDispatch();
    const onCreatePost = async (postData) => {
        setLoading(true);
        try {
            await dispatch(createPostAsync(postData));
            router.push(`${authUsername}/posts/`);
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <div className="card central-column">
                <div className="card-header central-column-header">
                    <h3 className="mb-0">Home</h3>
                </div>
                <div className="card-body">
                    <PostForm
                        onSubmit={onCreatePost}
                        loading={loading}
                    />
                </div>
            </div>
            <div>
                {!!users?.length && (
                    <UserList users={users}/>
                )}
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