import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import Cookie from "js-cookie";

import LoginForm from "../components/auth/loginForm";
import {axiosController} from "../lib/axiosController";
import {loginUser, getProfile} from "../api/auth";
import {withoutAuth} from "../lib/withoutAuth";

export default function Login() {
    const router = useRouter();
    const onLogin = async (inputs) => {
        try {
            const token = await loginUser(inputs);
            axiosController.setToken(token.data.data.access_token);
            const {data} = await getProfile();
            Cookie.set('username', data.data.username);
            Cookie.set("token", token.data.data.access_token);
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