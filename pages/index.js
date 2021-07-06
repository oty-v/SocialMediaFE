import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';

import PostForm from "../components/posts/postForm";
import UserList from "../components/users/usersList";
import {withAuth} from "../lib/withAuth";
import {fetchUsers} from "../redux/users/action";
import {withRedux} from "../lib/withRedux";
import {createPost} from "../redux/posts/action";
import {useMutation} from "@redux-requests/react";
import MiddleContent from "../components/common/layout/content/MiddleContent";

export default function Home() {
    const {loading} = useMutation({type: createPost})
    const dispatch = useDispatch();

    const handlePostCreate = useCallback(async (postData) => {
        await dispatch(createPost(postData));
    }, []);

    const handleUserSearch = useCallback(async (search) => {
        await dispatch(fetchUsers(search.query));
    }, []);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <MiddleContent
                title={'Home'}
            >
                <MiddleContent.Body>
                    <MiddleContent.Item>
                        <PostForm
                            onSubmit={handlePostCreate}
                            loading={loading}
                        />
                    </MiddleContent.Item>
                </MiddleContent.Body>
            </MiddleContent>
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

export const getServerSideProps = withRedux(withAuth(
    async (ctx, dispatch) => {
        const {error} = await dispatch(fetchUsers());
        if (error?.response.status === 404) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                page: ctx.query
            }
        };
    }
))