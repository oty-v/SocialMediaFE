import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import Cookie from "js-cookie";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            toast.error(error.toString())
        }
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <ToastContainer
                draggable={false}
                transition={Bounce}
                autoClose={5000}
            />
            <h1>Sign in</h1>
            <LoginForm onSubmit={onLogin}/>
            <Link href="/register">
                <span>Need an account?</span>
            </Link>
        </>
    );
}

export const getServerSideProps = withoutAuth()