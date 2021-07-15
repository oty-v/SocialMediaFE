import {useDispatch} from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import {useMutation, useQuery} from "@redux-requests/react";
import {useSelector} from 'react-redux';
import {useEffect} from "react";

import PostForm from "../components/posts/postForm";
import UserList from "../components/users/usersList";
import {withAuth} from "../lib/withAuth";
import {fetchUserFollowings, fetchUsers} from "../redux/users/action";
import {getCursorPosts} from "../redux/posts/selectors"
import {withRedux} from "../lib/withRedux";
import {createPost, fetchFollowPosts} from "../redux/posts/action";
import MainContent from "../components/common/layout/content/MainContent";
import PostsList from "../components/posts/postList";
import CenterInScreen from "../components/common/CenterInScreen";
import Loader from "../components/common/Loader";

export default function Home() {
    const {data, loading: loadingUsers} = useQuery({type:fetchUsers, requestKey: 1});
    const {posts, cursorPosts, pending: loadingPosts} = useSelector(state => getCursorPosts(state, fetchFollowPosts));
    const {loading} = useMutation({type: createPost})
    const dispatch = useDispatch();

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    })

    const handleScroll = () => {
        const onBottom = window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        if (onBottom && cursorPosts && !loadingPosts){
            dispatch(fetchFollowPosts(cursorPosts))
        }
    }

    const handlePostCreate = (postData) => {
        dispatch(createPost(postData));
    };

    const handleUserSearch = (search) => {
        dispatch(fetchUsers(search.query));
    };

    const loadingNextPosts = !!loadingPosts && (
        <CenterInScreen customClassName="my-3">
            <Loader/>
        </CenterInScreen>
    )
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <MainContent
                title="Home"
            >
                <MainContent.Body>
                    <MainContent.Item>
                        <PostForm
                            onSubmit={handlePostCreate}
                            loading={loading}
                        />
                    </MainContent.Item>
                    <MainContent.Item>
                        <PostsList posts={posts}/>
                    </MainContent.Item>
                    {loadingNextPosts}
                </MainContent.Body>
            </MainContent>
            <div className="mx-5">
                <div className="my-3">
                    <h4>Users</h4>
                    <UserList
                        onSubmit={handleUserSearch}
                        users={data.users}
                        loading={loadingUsers}
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
    async (ctx, dispatch, auth) => {
        const {error: errorUsers} = await dispatch(fetchUsers());
        const {error: errorFollowPosts} = await dispatch(fetchFollowPosts());
        const {error: errorUserFollowings} = await dispatch(fetchUserFollowings(auth.user.username));
        const error = errorUsers || errorFollowPosts || errorUserFollowings;
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