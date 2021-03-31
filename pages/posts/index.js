import {getApiData} from "../../api";
import Post from "../../components/post";

function Posts({posts}) {
    return (
        <>
            {posts && (
                <>
                    <h2>Posts List</h2>
                    <ul>
                        {posts.map(post => (
                            <Post post={post} key={post.id}/>
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
    return {
        props: {
            posts: res.data
        }
    };
}

export default Posts;