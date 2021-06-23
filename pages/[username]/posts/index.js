import {useCallback, useEffect} from "react";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import {useRouter} from "next/router";
import PostsList from "../../../components/posts/postList";
import {withAuth} from "../../../lib/withAuth";
import {fetchUserPosts, updatePost, deletePost} from "../../../redux/posts/action";
import {withRedux} from "../../../lib/withRedux";
import BackButton from "../../../components/common/BackButton";
import Loader from "../../../components/common/Loader";
import {getCursorPosts} from "../../../redux/posts/selectors";

function Posts({username}) {
    const {posts, cursorPosts, pending: loading} = useSelector(state => getCursorPosts(state, 'FETCH_USER_POSTS'));
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = async () => {
        const onBottom = window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight;
        if (onBottom && cursorPosts && !loading) {
            await dispatch(fetchUserPosts(username, cursorPosts));
        }
    };

    const handlePostRemove = useCallback(async (postId, postCursor) => {
        await dispatch(deletePost(postId, postCursor));
    },[]);

    const handlePostEdit = useCallback(async (postUpdate, postId, postCursor) => {
        await dispatch(updatePost(postUpdate, postId, postCursor));
    },[]);

    const handleClickPost = useCallback((post) => {
        router.push(`/${post.author.username}/posts/${post.id}`)
    },[]);

    const loadingNextPosts = !!loading && (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Loader/>
        </div>
    )

    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <div className="central-column">
                <div className="card-header central-column-header bg-transparent">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3 className="mb-0">Posts List</h3>
                        <span className="text-muted">{`@${username}`}</span>
                    </div>
                </div>
                <div className="card-body">
                    <PostsList
                        onRemovePost={handlePostRemove}
                        onEditPost={handlePostEdit}
                        handleClickPost={handleClickPost}
                        posts={posts}
                    />
                    {loadingNextPosts}
                </div>
            </div>
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