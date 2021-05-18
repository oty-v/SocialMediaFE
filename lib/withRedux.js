import {initializeStore} from "../redux/store";
import {authenticateAction} from "../redux/auth/action";

export const withRedux = (getServerSidePropsFunc) => {
    const reduxStore = initializeStore()
    const {dispatch} = reduxStore
    return async (ctx) => {
        const result = await getServerSidePropsFunc(ctx, dispatch);
        if (result.props.auth.user) {
            dispatch(authenticateAction(result.props.auth.user));
        }
        return {
            ...result,
            props: {
                initialReduxState: reduxStore.getState(),
                ...result.props
            }
        }

    }
}

