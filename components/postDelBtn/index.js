import { useRouter } from 'next/router';

import { deletePost } from '../../api';

function PostDelBtn({postID}) {
    const router = useRouter()
    const removePost = async (postID) => {
        const res = await deletePost(postID);
        if(!res.error)router.push('/posts');
    }
    return <button onClick={()=>{removePost(postID)}}>Remove</button>
}

export default PostDelBtn;