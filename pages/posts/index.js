import Link from 'next/link'
import { getApiData } from "../../api";

function Posts({posts}) {
    return (
        <>
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
        </>
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