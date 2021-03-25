import { useState, useEffect } from 'react';

import PostForm from "./components/postForm";
import EditPanel from "./components/editPanel";

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/posts/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPosts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    return (
        <div>
            <main>
                <PostForm/>
                {error && (<div>Error: {error.message}</div>)}
                {isLoaded && (
                    <>
                    <h2>Posts List</h2>
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <b>{post.title}</b>
                                <hr/>
                                <p>{post.description}</p>
                                <EditPanel postID={post.id}/>
                            </li>
                        ))}
                    </ul>
                    </>
                )}
            </main>
        </div>
    )
}

export default Home;
