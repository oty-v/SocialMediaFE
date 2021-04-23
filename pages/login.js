import Head from "next/head";
import Link from "next/link";
import Cookie from "js-cookie";

import LoginForm from "../components/auth/loginForm";
import {loginUser, getProfile} from "../lib/api";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Login({isLoggedIn}) {
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) {
            router.push(`/`);
        }
    });
    const onLogin = async (inputs) => {
        const token = await loginUser(inputs);
        Cookie.set("token", token.data.data.access_token);
        const {data} = await getProfile(token.data.data.access_token);
        Cookie.set("username", data.data.username);
        router.push("/");
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
