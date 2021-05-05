import {axiosController} from "./axiosController";

export const withAuth = (getServerSidePropsFunc) => {
    return async (ctx) => {
        const { token } = ctx.req.cookies
        if (token) {
            try {
                axiosController.setToken(token);
                if (getServerSidePropsFunc) {
                    const result = await getServerSidePropsFunc(ctx, token)
                    return {
                        ...result,
                        props: {
                            token,
                            isLoggedIn: true,
                            ...result.props
                        }
                    }
                }
                return { props: { token } }
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

