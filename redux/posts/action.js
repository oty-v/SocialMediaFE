import {createAction} from "redux-smart-actions";

export const fetchUserPosts = createAction('FETCH_USER_POSTS', (username, cursor = '') => ({
    request: {
        url: `/users/${username}/posts`,
        params: {
            cursor,
        },
    },
    meta: {
        requestKey: cursor,
        getData: data => ({
            posts: data.data,
            cursorPosts: data.links.next && data.links.next.match(/cursor=(\w+)/)[1]
        }),
    },
}));

export const fetchTagPosts = createAction('FETCH_TAG_POSTS', (tag, cursor = '') => ({
    request: {
        url: `/tags/${tag}/posts`,
        params: {
            cursor,
        },
    },
    meta: {
        requestKey: cursor,
        getData: data => ({
            posts: data.data,
            cursorPosts: data.links.next && data.links.next.match(/cursor=(\w+)/)[1]
        }),
    },
}));

export const fetchFollowPosts = createAction('FETCH_FOLLOW_POSTS', (cursor = '') => ({
    request: {
        url: '/followings/posts',
        params: {
            cursor,
        },
    },
    meta: {
        requestKey: cursor,
        getData: data => ({
            posts: data.data,
            cursorPosts: data.links.next && data.links.next.match(/cursor=(\w+)/)[1]
        })
    }
}))

export const fetchPost = createAction('FETCH_POST', postId => ({
    request: {
        url: `/posts/${postId}`
    },
    meta: {
        requestKey: postId,
        requestsCapacity: 2,
        getData: data => data.data,
    },
}));

export const createPost = createAction('CREATE_POST', (createdData) => ({
    request: {
        url: `/posts/`,
        method: 'post',
        data: createdData
    },
}));

export const updatePost = createAction('UPDATE_POST', (updatedData, postId, cursor) => ({
    request: {
        url: `/posts/${postId}`,
        method: 'put',
        data: updatedData
    },
    meta: {
        requestKey: cursor || postId,
        mutations: {
            [fetchUserPosts + cursor]: (data, mutationData) => {
                const posts = data.posts.map(post =>
                    post.id === postId ? mutationData.data : post
                )
                return Object.assign(data, {posts})
            },
            [fetchTagPosts + cursor]: (data, mutationData) => {
                const posts = data.posts.map(post =>
                    post.id === postId ? mutationData.data : post
                )
                return Object.assign(data, {posts})
            },
            [fetchPost + postId]: (data, mutationData) => Object.assign(data, mutationData.data)
        },
    },
}));

export const deletePost = createAction('DELETE_POST', (postId, cursor) => ({
    request: {
        url: `/posts/${postId}`,
        method: 'delete',
    },
    meta: {
        requestKey: cursor || postId,
        mutations: {
            [fetchUserPosts + cursor]: (data) => {
                const postIndex = data.posts.findIndex(post => post.id === postId)
                data.posts.splice(postIndex, 1)
                return data
            },
            [fetchTagPosts + cursor]: (data) => {
                const postIndex = data.posts.findIndex(post => post.id === postId)
                data.posts.splice(postIndex, 1)
                return data
            },
            [fetchPost + postId]: () => {},
        },
    },
}));

export const likePost = createAction('LIKE_POST', (postId, cursor = '') => ({
    request: {
        url: `/posts/${postId}/like`
    },
    meta: {
        requestKey: cursor || postId,
        mutations: {
            [fetchUserPosts + cursor]: (data) => {
                const post = data.posts.find(post => post.id === postId)
                const postIndex = data.posts.findIndex(post => post.id === postId)
                data.posts.splice(postIndex, 1, {...post, userLiked: true, numberOfLikes: post.numberOfLikes+1})
                return data
            },
            [fetchTagPosts + cursor]: (data) => {
                const post = data.posts.find(post => post.id === postId)
                const postIndex = data.posts.findIndex(post => post.id === postId)
                data.posts.splice(postIndex, 1, {...post, userLiked: true, numberOfLikes: post.numberOfLikes+1})
                return data
            },
            [fetchFollowPosts + cursor]: (data) => {
                const post = data.posts.find(post => post.id === postId)
                const postIndex = data.posts.findIndex(post => post.id === postId)
                data.posts.splice(postIndex, 1, {...post, userLiked: true, numberOfLikes: post.numberOfLikes+1})
                return {...data}
            },
            [fetchPost + postId]: (data) => {
                return {...data, userLiked: true, numberOfLikes: data.numberOfLikes+1}
            },
        },
    },

}))

export const unlikePost = createAction('UNLIKE_POST', (postId, cursor = '') => ({
    request: {
        url: `/posts/${postId}/unlike`
    },
    meta: {
        requestKey: cursor || postId,
        mutations: {
            [fetchUserPosts + cursor]: (data) => {
                const post = data.posts.find(post => post.id === postId)
                const postIndex = data.posts.findIndex(post => post.id === postId)
                data.posts.splice(postIndex, 1, {...post, userLiked: false, numberOfLikes: post.numberOfLikes-1})
                return data
            },
            [fetchTagPosts + cursor]: (data) => {
                const post = data.posts.find(post => post.id === postId)
                const postIndex = data.posts.findIndex(post => post.id === postId)
                data.posts.splice(postIndex, 1, {...post, userLiked: false, numberOfLikes: post.numberOfLikes-1})
                return data
            },
            [fetchFollowPosts + cursor]: (data) => {
                const post = data.posts.find(post => post.id === postId)
                const postIndex = data.posts.findIndex(post => post.id === postId)
                data.posts.splice(postIndex, 1, {...post, userLiked: false, numberOfLikes: post.numberOfLikes-1})
                return data
            },
            [fetchPost + postId]: (data) => {
                return {...data, userLiked: false, numberOfLikes: data.numberOfLikes-1}
            },
        },
    },
}))