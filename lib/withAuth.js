import {axiosController} from "./axiosController";
import {getProfile} from "../api/auth";
import Cookies from "cookies"

export const withAuth = (getServerSidePropsFunc) => {
    return async (ctx) => {
        const { token } = ctx.req.cookies
        if (token) {
            try {
                axiosController.setToken(token);
                const {data} = await getProfile();
                const auth = { token, user: data.data }
                if (getServerSidePropsFunc) {
                    const result = await getServerSidePropsFunc(ctx, auth)
                    return {
                        ...result,
                        props: {
                            auth,
                            isLoggedIn: true,
                            ...result.props
                        }
                    }
                }
                return { props: { auth } }
            }
            catch (e) {
                if (e.response.status===401){
                    const cookies = new Cookies (ctx.req, ctx.res)
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

