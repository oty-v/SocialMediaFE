import Head from 'next/head';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {withAuth} from "../../lib/withAuth";
import {withRedux} from "../../lib/withRedux";
import {getCursorPosts} from "../../redux/posts/selectors";
import {fetchTagPosts} from "../../redux/posts/action";
import Loader from "../../components/common/Loader";
import PostsList from "../../components/posts/postList";
import CenterInScreen from "../../components/common/CenterInScreen";
import MainContent from "../../components/common/layout/content/MainContent";
import {fetchMentions, fetchUserFollowings} from "../../redux/users/action";

export default function Tag({tag}) {
    const {posts, cursorPosts, pending: loading} = useSelector(state => getCursorPosts(state, fetchTagPosts));
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = () => {
        const onBottom = window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight;
        if (onBottom && cursorPosts && !loading) {
            dispatch(fetchTagPosts(tag, cursorPosts));
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
                <title>{tag}</title>
            </Head>
            <MainContent
                backBtn
                title="Posts List"
                tagName={tag}
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
        const {error: errorTagPosts} = await dispatch(fetchTagPosts(ctx.query.tag));
        const {error: errorUserFollowings} = await dispatch(fetchUserFollowings(auth.user.username));
        const {error: errorMentions} = await dispatch(fetchMentions());
        const error = errorTagPosts || errorUserFollowings || errorMentions;
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

