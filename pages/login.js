import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import Cookie from "js-cookie";

import LoginForm from "../components/auth/loginForm";
import {axiosController} from "../lib/axiosController";
import {loginUser, getProfile} from "../api/auth";
import {useEffect} from "react";
import {parseCookies} from "../helpers/parseCookies";

export default function Login({isLoggedIn}) {
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) {
            router.push(`/`);
        }
    }, [isLoggedIn]);
    const onLogin = async (inputs) => {
        const token = await loginUser(inputs);
        axiosController.setToken(token.data.data.access_token);
        const {data} = await getProfile();
        Cookie.set('username', data.data.username);
        Cookie.set("token", token.data.data.access_token);
        router.push(`/`);
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

export const getServerSideProps = async ({req}) => {
    const {token} = parseCookies(req);
    if (!token) {
        return {
            props: {
                isLoggedIn: false
            }
        };
    }
    return {
        props: {
            isLoggedIn: true
        }
    };
}