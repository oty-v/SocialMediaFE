import {useCallback, useEffect} from "react";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";

import {useRouter} from "next/router";
import PostsList from "../../../components/posts/postList";
import {withAuth} from "../../../lib/withAuth";
import {fetchUserPosts, updatePost, deletePost} from "../../../redux/posts/action";
import {withRedux} from "../../../lib/withRedux";
import Loader from "../../../components/common/Loader";
import {getCursorPosts} from "../../../redux/posts/selectors";
import CenterInScreen from "../../../components/common/CenterInScreen";
import MiddleContent from "../../../components/common/layout/content/MiddleContent";

function Posts({username}) {
    const {posts, cursorPosts, pending: loading} = useSelector(state => getCursorPosts(state, 'FETCH_USER_POSTS'));
    const router = useRouter();
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

    const handlePostRemove = useCallback((postId, postCursor) => {
        dispatch(deletePost(postId, postCursor));
    }, []);

    const handlePostEdit = useCallback((postUpdate, postId, postCursor) => {
        dispatch(updatePost(postUpdate, postId, postCursor));
    }, []);

    const handleClickPost = useCallback((post) => {
        router.push(`/${post.author.username}/posts/${post.id}`)
    }, []);

    const loadingNextPosts = !!loading && (
        <CenterInScreen>
            <Loader/>
        </CenterInScreen>
    )

    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <MiddleContent
                backBtn
                title={'Posts List'}
                username={username}
            >
                <MiddleContent.Body>
                    <MiddleContent.Item>
                        <PostsList
                            onRemovePost={handlePostRemove}
                            onEditPost={handlePostEdit}
                            handleClickPost={handleClickPost}
                            posts={posts}
                        />
                    </MiddleContent.Item>
                    {loadingNextPosts}
                </MiddleContent.Body>
            </MiddleContent>
        </>
    )

}

export const getServerSideProps = withRedux(withAuth(
    async (ctx, dispatch) => {
        const {error} = await dispatch(fetchUserPosts(ctx.query.username));
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