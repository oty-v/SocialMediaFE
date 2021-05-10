import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import Cookie from "js-cookie";

import LoginForm from "../components/auth/loginForm";
import {loginUser} from "../api/auth";
import {withoutAuth} from "../lib/withoutAuth";

export default function Login() {
    const router = useRouter();
    const onLogin = async (inputs) => {
        try {
            const {data: {data: {access_token: accessToken}}} = await loginUser(inputs);
            Cookie.set("token", accessToken);
            router.push(`/`);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <h1>Sign in</h1>
            <LoginForm onSubmit={onLogin}/>
            <Link href="/register">
                <span>Need an account?</span>
            </Link>
        </>
    );
}

export const getServerSideProps = withoutAuth()