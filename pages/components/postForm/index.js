import { useState } from 'react';

import { pushPostData, editPostData } from '../../api';

function PostForm({postID}) {
    const [postTitle, setPostTitle] = useState('');
    const [postDesc, setPostDesc] = useState('');
    const sendPost = (event) => {
        event.preventDefault();
        const postData = {
            title: postTitle,
            description: postDesc
        }
        { postID ? editPostData(postID,postData) : pushPostData(postData) }
    };

    return (
        <>
            { !postID && <h2>Create post</h2> }
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
                <button type="submit" disabled={ !postID && (!postTitle||!postDesc) }>Save</button>
            </form>
        </>
    )
}

export default PostForm;