import { useRouter } from 'next/router'

import {pushDeletePost} from '../../api';

function PostDelBtn({postID}) {
    const router = useRouter()
    const removePost = (postID) => {
        const res = pushDeletePost(postID);
        if(!res.error)router.reload();
    }
    return (
        <>
            <button onClick={()=>{removePost(postID)}}>Remove</button>
            <style jsx>{`
                button {
                    margin: 1rem;
                }
            `}
            </style>
        </>
    )
}

export default PostDelBtn;