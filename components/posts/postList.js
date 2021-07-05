import {useQuery} from "@redux-requests/react";

import Post from "./post";
import {fetchProfile} from "../../redux/auth/action";
import {CenterInScreen} from "../common/CenterInScreen";

const PostsList = ({onRemovePost, onEditPost, handleClickPost, posts}) => {
    const {data:{username:authUser}} = useQuery({ type: fetchProfile });
    if (!posts.length) {
        return (
            <CenterInScreen>
                <span>No posts</span>
            </CenterInScreen>
        )
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