import {axiosController} from "./axiosController";
import {fetchProfile} from "../redux/auth/action";
import Cookies from "cookies"

export const withAuth = (getServerSidePropsFunc) => {
    return async (ctx, dispatch) => {
        const {token} = ctx.req.cookies
        if (token) {
            axiosController.setToken(token);
            if (dispatch){
                const { data:user, error, action } = await dispatch(fetchProfile());
                if (error?.response.status === 401) {
                    const cookies = new Cookies(ctx.req, ctx.res)
                    cookies.set('token')
                    return {
                        redirect: {
                            destination: '/login',
                            permanent: false,
                        }
                    }
                }
                const auth = {token, user};
                if (getServerSidePropsFunc) {
                    const result = await getServerSidePropsFunc(ctx, dispatch, auth)
                    return {
                        ...result,
                        props: {
                            auth,
                            isLoggedIn: true,
                            ...result.props
                        }
                    }
                }
                return {props: {auth}}
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

