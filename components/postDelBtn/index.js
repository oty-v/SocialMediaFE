import { useRouter } from 'next/router';

import { pushDeletePost } from '../../api';

function PostDelBtn({postID}) {
    const router = useRouter()
    const removePost = (postID) => {
        const res = pushDeletePost(postID);
        if(!res.error)router.push('/posts');
    }
    return <button onClick={()=>{removePost(postID)}}>Remove</button>
}

export default PostDelBtn;