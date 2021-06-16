import {useQuery} from "@redux-requests/react";

import Post from "./post";
import Loader from "../common/Loader";

const PostsList = ({onRemovePost, onEditPost, handleClickPost}) => {
    const {data:{username:authUser}} = useQuery({ type: 'FETCH_PROFILE' });
    const {data: {posts}, loading} = useQuery({type: 'FETCH_USER_POSTS'});
    if (loading) {
        return (
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <Loader/>
            </div>
        )
    }
    if (!posts.length) {
        return <span>No posts</span>
    }
    return (
        <ul className="list-group list-group-flush">
            {posts.map(post => (
                <li className="list-group-item list-group-item-action" key={post.id}>
                    <Post
                        onEdit={onEditPost}
                        onRemove={onRemovePost}
                        onClick={() => handleClickPost(post)}
                        post={post}
                        showPostControls={authUser === post.author.username}
                        loading={loading}
                    />
                </li>
            ))}
        </ul>
    )
}

export default PostsList