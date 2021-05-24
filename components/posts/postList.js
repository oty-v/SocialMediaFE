import {useSelector} from "react-redux";

import Post from "./post";

const PostsList = ({onRemovePost, onEditPost, handleClickPost, loading}) => {
    const auth = useSelector((state) => state.auth);
    const posts = useSelector((state) => state.posts.posts);
    const authUser = auth.profile.username;
    if (!!posts) {
        return <span>No posts</span>
    }
    return (
        <ul className="list-group">
            {posts.map(post => (
                <li className="list-group-item" key={post.id}>
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