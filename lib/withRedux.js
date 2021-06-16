import {initializeStore, configureStore} from "../redux/store";

export const withRedux = (getServerSidePropsFunc) => {
    const { store } = configureStore();
    const {dispatch} = store
    return async (ctx) => {
        const result = await getServerSidePropsFunc(ctx, dispatch);
        return {
            ...result,
            props: {
                initialReduxState: store.getState(),
                ...result.props
            }
        }

    }
}

