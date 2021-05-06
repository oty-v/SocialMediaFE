import Head from "next/head";

import {getUserPosts} from "../../../api/posts";
import {useRouter} from "next/router";
import PostsList from "../../../components/postsList";
import Cookie from "js-cookie";
import {withAuth} from "../../../lib/withAuth";

function Posts({username, posts}) {
    const authUser = Cookie.get("username");
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
                <PostsList posts={posts} handleClickEdit={handleClickEdit} authUser={authUser}/>
            ) : (
                <span>No posts</span>
            )}
        </>
    )

}

export const getServerSideProps = withAuth(async (ctx, token) => {
    const {data} = await getUserPosts(ctx.query.username);
    return {
        props: {
            username: ctx.query.username,
            posts: data.data
        }
    };
})

export default Posts;