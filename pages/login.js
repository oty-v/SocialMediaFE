import {useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import Cookie from "js-cookie";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "../components/auth/loginForm";
import {loginUser} from "../api/auth";
import {withoutAuth} from "../lib/withoutAuth";

export default function Login() {
    const router = useRouter();
    const [waitDispatch, setWaitDispatch] = useState(false);
    const onLogin = async (inputs) => {
        setWaitDispatch(true);
        try {
            const {data: {data: {access_token: accessToken}}} = await loginUser(inputs);
            Cookie.set("token", accessToken);
            router.push(`/`);
        } catch (error) {
            toast.error(error.toString())
        }
        setWaitDispatch(false);
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <h1>Sign in</h1>
            <LoginForm
                onSubmit={onLogin}
                waitDispatch={waitDispatch}
            />
            <Link href="/register">
                <span>Need an account?</span>
            </Link>
        </>
    );
}

export const getServerSideProps = withoutAuth()