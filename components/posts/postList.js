import {useMutation, useQuery} from "@redux-requests/react";

import Post from "./post";
import Loader from "../common/Loader";
import {fetchUserPosts} from "../../redux/posts/action";
import {fetchProfile} from "../../redux/auth/action";

const PostsList = ({onRemovePost, onEditPost, handleClickPost, posts, loading}) => {
    const {data:{username:authUser}} = useQuery({ type: fetchProfile });
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
                    />
                </li>
            ))}
        </ul>
    )
}

export default PostsList