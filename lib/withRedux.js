import {initializeStore} from "../redux/store";

export const withRedux = (getServerSidePropsFunc) => {
    const reduxStore = initializeStore()
    const {dispatch} = reduxStore
    return async (ctx) => {
        const result = await getServerSidePropsFunc(ctx, dispatch);
        return {
            ...result,
            props: {
                initialReduxState: reduxStore.getState(),
                ...result.props
            }
        }

    }
}

