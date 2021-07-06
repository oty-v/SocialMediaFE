import {useQuery} from "@redux-requests/react";

import Post from "./post";
import {fetchProfile} from "../../redux/auth/action";
import CenterInScreen from "../common/CenterInScreen";
import List from "../common/list/List";

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
        <List customClassName={"list-group-flush"}>
            {posts.map(post => (
                <List.Item key={post.id}>
                    <Post
                        onEdit={onEditPost}
                        onRemove={onRemovePost}
                        onClick={() => handleClickPost(post)}
                        post={post}
                        showPostControls={authUser === post.author.username}
                    />
                </List.Item>
            ))}
        </List>
    )
}

export default PostsList