import {axiosController} from "./axiosController";
import {getProfile} from "../api/auth";

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

