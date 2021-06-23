export const getCursorPosts = (state, type) => {
    const requestsKeys = state.requests.requestsKeys[type];
    const queries = state.requests.queries;
    const lastRequestsKeys = requestsKeys[requestsKeys.length - 1];
    const lastQuery = queries[`${type}${lastRequestsKeys}`];
    const posts = requestsKeys.reduce((values, item) => {
        const currentQuery = queries[`${type}${item}`].data;
        currentQuery && values.push(...currentQuery.posts.map(post => {
            post.cursor = item
            return post
        }))
        return values
    }, []);
    return {
        posts,
        cursorPosts: lastQuery.data?.cursorPosts,
        pending: lastQuery.pending
    }
}