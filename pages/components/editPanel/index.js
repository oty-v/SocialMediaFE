import { useState } from 'react';

import PostForm from "./../postForm";
import { removePostData } from '../../api';

function EditPanel({postID}) {
    const [editPost, setEditPost] = useState(false);
    return (
        <>
            { editPost && <PostForm postID={postID}/> }
            <button onClick={()=>setEditPost(!editPost)}>{!editPost?'Edit':'Close'}</button>
            <button onClick={()=>removePostData(postID)}>Remove</button>
        </>
    )
}

export default EditPanel;