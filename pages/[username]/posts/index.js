import {useState, useEffect} from "react";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useRouter} from "next/router";
import PostsList from "../../../components/posts/postList";
import {withAuth} from "../../../lib/withAuth";
import {removePostAsync, updatePostAsync, getPostsAsync, getNextPostsAsync} from "../../../redux/posts/action";
import {withRedux} from "../../../lib/withRedux";
import BackButton from "../../../components/common/BackButton";
import Loader from "../../../components/common/Loader";

function Posts({username}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const cursorPosts = useSelector((state) => state.posts.cursor);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = async () => {
        const onBottom = window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight;
        if (onBottom && cursorPosts) {
            try {
                await dispatch(getNextPostsAsync(username, cursorPosts));
            } catch (error) {
                toast.error(error.toString())
            }
        }
    };

    const handlePostRemove = async (post) => {
        setLoading(true);
        try {
            await dispatch(removePostAsync(post.id));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const handlePostEdit = async (post) => {
        setLoading(true);
        try {
            await dispatch(updatePostAsync(post.id, post));
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    const handleClickPost = (post) => {
        router.push(`/${post.author.username}/posts/${post.id}`)
    }
    const loadingNextPosts = !!cursorPosts && (
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
                <div className="card-header central-column-header">
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
                        loading={loading}
                    />
                    {loadingNextPosts}
                </div>
            </div>
        </>
    )

}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    try {
        await dispatch(getPostsAsync(ctx.query.username));
        return {
            props: {
                username: ctx.query.username
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

export default Posts;