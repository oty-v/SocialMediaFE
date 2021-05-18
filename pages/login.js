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
    const [loading, setLoading] = useState(false);
    const onLogin = async (inputs) => {
        setLoading(true);
        try {
            const {data: {data: {access_token: accessToken}}} = await loginUser(inputs);
            Cookie.set("token", accessToken);
            router.push(`/`);
        } catch (error) {
            toast.error(error.toString())
        }
        setLoading(false);
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <h1>Sign in</h1>
            <LoginForm
                onSubmit={onLogin}
                loading={loading}
            />
            <Link href="/register">
                <span>Need an account?</span>
            </Link>
        </>
    );
}

export const getServerSideProps = withoutAuth()