import Head from "next/head";

import {getUserPosts} from "../../../api/posts";
import {useRouter} from "next/router";
import PostsList from "../../../components/posts/postList";
import {withAuth} from "../../../lib/withAuth";

function Posts({auth, username, posts}) {
    const router = useRouter();
    const handleClickEdit = (post) => {
        router.push(`/${username}/posts/${post.id}`)
    }
    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <h2>Posts List</h2>
            {!!posts?.length ? (
                <PostsList
                    posts={posts}
                    handleClickEdit={handleClickEdit}
                    authUser={auth.user.username}
                />
            ) : (
                <span>No posts</span>
            )}
        </>
    )

}

export const getServerSideProps = withAuth(async (ctx, auth) => {
    try {
        const {data: {data: posts}} = await getUserPosts(ctx.query.username);
        return {
            props: {
                username: ctx.query.username,
                posts
            }
        };
    } catch (e) {
        if (e.response.status === 404) {
            return {
                notFound: true,
            }
        }
    }
})

export default Posts;