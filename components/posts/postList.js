import {useSelector} from "react-redux";

import Post from "./post";
import Loader from "../common/Loader";

const PostsList = ({onRemovePost, onEditPost, handleClickPost, loading}) => {
    const auth = useSelector((state) => state.auth);
    const posts = useSelector((state) => state.posts.posts);
    const authUser = auth.profile.username;
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