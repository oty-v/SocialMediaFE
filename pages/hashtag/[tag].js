import Head from 'next/head';
import {useCallback, useEffect} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import {withAuth} from "../../lib/withAuth";
import {withRedux} from "../../lib/withRedux";
import {getCursorPosts} from "../../redux/posts/selectors";
import {deletePost, fetchTagPosts, updatePost} from "../../redux/posts/action";
import Loader from "../../components/common/Loader";
import BackButton from "../../components/common/BackButton";
import PostsList from "../../components/posts/postList";
import {CenterInScreen} from "../../components/common/CenterInScreen";

export default function Tag({tag}) {
    const {posts, cursorPosts, pending: loading} = useSelector(state => getCursorPosts(state, 'FETCH_TAG_POSTS'));
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
            await dispatch(fetchTagPosts(tag, cursorPosts));
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
        <CenterInScreen>
            <Loader/>
        </CenterInScreen>
    )
    return (
        <>
            <Head>
                <title>{tag}</title>
            </Head>
            <div className="central-column">
                <div className="card-header central-column-header bg-transparent">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3 className="mb-0">Posts List</h3>
                        <span className="text-muted">{`#${tag}`}</span>
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
        const {error} = await dispatch(fetchTagPosts(ctx.query.tag));
        if (error?.response.status === 404) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                tag: ctx.query.tag
            }
        };
    }
))

