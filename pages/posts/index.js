import Link from 'next/link'
import {getApiData} from "../../api";
import BasePage from "../../components/basePage";
import PostDelBtn from "../../components/postDelBtn";

function Posts({posts}) {
    return (
        <BasePage pageTitle={'Posts list'}>
            {posts && (
                <>
                    <h2>Posts List</h2>
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <b>User: {post.username}</b>
                                <hr/>
                                <p>{post.content}</p>
                                <Link href={`/posts/${encodeURIComponent(post.id)}`}>
                                    <a>
                                        <button>Edit post</button>
                                    </a>
                                </Link>
                                <PostDelBtn postID={post.id}/>
                            </li>
                        ))}
                    </ul>
                    <style jsx>{`
                        ul {
                            width: 90vw;
                        }
                    `}
                    </style>
                </>
            )}
        </BasePage>
    )
}

export const getServerSideProps = async () => {
    const res = await getApiData('/posts');
    if (res.error) {
        return {
            notFound: true,
        }
    }


    return {props: {posts: res.data}};
}

export default Posts;