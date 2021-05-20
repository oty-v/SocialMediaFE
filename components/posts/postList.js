import {useSelector} from "react-redux";

import Post from "./post";

const PostsList = ({onRemovePost, onEditPost, handleClickComments, loading}) => {
    const auth = useSelector((state) => state.auth);
    const posts = useSelector((state) => state.posts.posts);;
    const authUser = auth.user.username;
    return (
        <ul className="list-group">
            {posts.map(post => (
                <li className="list-group-item" key={post.id}>
                    <Post
                        onEdit={onEditPost}
                        onRemove={onRemovePost}
                        onCommentsClick={() => handleClickComments(post)}
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