import {axiosController} from "./axiosController";
import {getProfile} from "../api/auth";
import Cookies from "cookies"
import {initializeStore} from "../redux/store";
import {authenticateAction} from "../redux/actions/ActionCreator";

export const withAuth = (getServerSidePropsFunc) => {
    const reduxStore = initializeStore()
    const { dispatch } = reduxStore
    return async (ctx) => {
        const {token} = ctx.req.cookies
        if (token) {
            try {
                axiosController.setToken(token);
                const {data: {data: user}} = await getProfile();
                dispatch(authenticateAction(user));
                const auth = {token, user};
                if (getServerSidePropsFunc) {
                    const result = await getServerSidePropsFunc(ctx, dispatch, auth)
                    return {
                        ...result,
                        props: {
                            initialReduxState: reduxStore.getState(),
                            auth,
                            isLoggedIn: true,
                            ...result.props
                        }
                    }
                }
                return {props: {auth}}
            } catch (e) {
                if (e.response.status === 401) {
                    const cookies = new Cookies(ctx.req, ctx.res)
                    cookies.set('token')
                }
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    }
                }
            }
        }
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
}

