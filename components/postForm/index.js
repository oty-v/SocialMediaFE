import {useState} from 'react';

import {pushCreatePost, pushEditPost} from '../../api';

function PostForm({post}) {
    const [postUsername, setPostUsername] = useState(post && post.username);
    const [postContent, setPostContent] = useState(post && post.content);
    const sendPost = (event) => {
        event.preventDefault();
        const postData = {
            username: postUsername,
            content: postContent,
        }
        if(post){
            return pushEditPost(post.id, postData)
        }
        pushCreatePost(postData);
        setPostUsername('');
        setPostContent('');
    };

    return (
        <>
            {!post && <h2>Create post</h2>}
            <form onSubmit={sendPost}>
                <label>Username</label>
                <input
                    value={postUsername}
                    onChange={(event) => setPostUsername(event.target.value)}
                    type="text"
                    placeholder="Enter Username"
                    required
                />
                <label>Post Content</label>
                <textarea
                    value={postContent}
                    onChange={(event) => setPostContent(event.target.value)}
                    rows="5"
                    cols="30"
                    placeholder="Enter post text"
                    required
                />
                <button
                    type="submit"
                    disabled={!post && (!postUsername || !postContent)}
                >
                    Save
                </button>
            </form>
            <style jsx>{`
                form {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                input, textarea {
                    margin: 1rem;
                }
            `}
            </style>
        </>
    )
}

export default PostForm;
