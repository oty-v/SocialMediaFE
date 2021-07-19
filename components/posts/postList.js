import {useQuery} from "@redux-requests/react";

import Post from "./post";
import {fetchProfile} from "../../redux/auth/action";
import CenterInScreen from "../common/CenterInScreen";
import List from "../common/list/List";
import {deletePost, likePost, unlikePost, updatePost} from "../../redux/posts/action";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {fetchUserFollowings} from "../../redux/users/action";

const PostsList = ({customHandleClick, posts}) => {
    const {data: authUser} = useQuery({ type: fetchProfile });
    const {data: followings} = useQuery({type: fetchUserFollowings, requestKey: authUser?.username})
    const router = useRouter();
    const dispatch = useDispatch();
    
    if (!posts.length) {
        return (
            <CenterInScreen customClassName="my-3">
                No posts
            </CenterInScreen>
        )
    }
    
    const handlePostRemove = (postId, postCursor) => {
        dispatch(deletePost(postId, postCursor));
    };

    const handlePostEdit = (postUpdate, postId, postCursor) => {
        dispatch(updatePost(postUpdate, postId, postCursor));
    };

    const baseHandleClick = (post) => {
        router.push(`/${post.author.username}/posts/${post.id}`)
    }

    const handleClick = (post) => {
        customHandleClick ? customHandleClick(post) : baseHandleClick(post)
    };

    const handleLike = (postId, cursor, userLiked) => {
        userLiked ? (
            dispatch(unlikePost(postId, cursor))
        ) : (
            dispatch(likePost(postId, cursor))
        )
    }
    
    return (
        <List customClassName="list-group-flush">
            {posts.map(post => (
                <List.Item key={post.id}>
                    <Post
                        onEdit={handlePostEdit}
                        onRemove={handlePostRemove}
                        onClick={() => handleClick(post)}
                        onLike={() => handleLike(post.id, post.cursorPosts, post.userLiked)}
                        post={post}
                        showPostControls={authUser.username === post.author.username}
                        following={followings && followings.some(following => following.username === post.author.username)}
                    />
                </List.Item>
            ))}
        </List>
    )
}

export default PostsList