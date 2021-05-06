export const withoutAuth = (getServerSidePropsFunc) => {
    return async (ctx) => {
        const {token} = ctx.req.cookies
        if (!token) {
            try {
                if (getServerSidePropsFunc) {
                    const result = await getServerSidePropsFunc(ctx)
                    return {
                        ...result,
                        props: {
                            isLoggedIn: false,
                            ...result.props
                        }
                    }
                }
                return {
                    props: {
                        isLoggedIn: false
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
}
