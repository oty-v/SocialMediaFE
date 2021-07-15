import {useEffect} from "react";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";

import PostsList from "../../../components/posts/postList";
import {withAuth} from "../../../lib/withAuth";
import {fetchUserPosts} from "../../../redux/posts/action";
import {withRedux} from "../../../lib/withRedux";
import Loader from "../../../components/common/Loader";
import {getCursorPosts} from "../../../redux/posts/selectors";
import CenterInScreen from "../../../components/common/CenterInScreen";
import MainContent from "../../../components/common/layout/content/MainContent";
import {fetchUserFollowings} from "../../../redux/users/action";

function Posts({username}) {
    const {posts, cursorPosts, pending: loading} = useSelector(state => getCursorPosts(state, fetchUserPosts));
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = () => {
        const onBottom = window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight;
        if (onBottom && cursorPosts && !loading) {
            dispatch(fetchUserPosts(username, cursorPosts));
        }
    };

    const loadingNextPosts = !!loading && (
        <CenterInScreen customClassName="my-3">
            <Loader/>
        </CenterInScreen>
    )

    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <MainContent
                backBtn
                title="Posts List"
                username={username}
            >
                <MainContent.Body>
                    <MainContent.Item>
                        <PostsList
                            posts={posts}
                        />
                    </MainContent.Item>
                    {loadingNextPosts}
                </MainContent.Body>
            </MainContent>
        </>
    )

}

export const getServerSideProps = withRedux(withAuth(
    async (ctx, dispatch, auth) => {
        const {error: errorUserPosts} = await dispatch(fetchUserPosts(ctx.query.username));
        const {error: errorUserFollowings} = await dispatch(fetchUserFollowings(auth.user.username));
        const error = errorUserPosts || errorUserFollowings;
        if (error?.response.status === 404) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                username: ctx.query.username,
            }
        };
    }
))

export default Posts;