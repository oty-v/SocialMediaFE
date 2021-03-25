import { useState } from 'react';
import { pushPostData } from '../../api';

function PostForm() {
    const [postTitle, setPostTitle] = useState('');
    const [postDesc, setPostDesc] = useState('');
    const sendPost = (event) => {
        event.preventDefault();
        const postData = {
            title: postTitle,
            description: postDesc
        }
        pushPostData(postData)
    };

    return (
        <>
            <h2>Create post</h2>
            <form onSubmit={sendPost}>
                <input
                    value={postTitle}
                    onChange={(event)=>setPostTitle(event.target.value)}
                    type="text"
                    placeholder="Enter post title"
                />
                <input
                    value={postDesc}
                    onChange={(event)=>setPostDesc(event.target.value)}
                    type="text"
                    placeholder="Enter description"
                />
                <button type="submit" disabled={ !postTitle||!postDesc }>Save</button>
            </form>
        </>
    )
}

export default PostForm;