import {useState} from 'react'
import Head from "next/head";
import Link from "next/link";
import {toast} from "react-toastify";
import Cookie from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "../components/auth/registerForm";
import {registerUser} from "../api/auth";
import {useRouter} from "next/router";
import {withoutAuth} from "../lib/withoutAuth";

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const onRegister = async (inputs) => {
        setLoading(true);
        try {
            const {data: {data: {access_token: accessToken}}} = await registerUser(inputs);
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
                <title>Register</title>
                <meta name="description" content="Please register before login"/>
            </Head>
            <h1>Sign Up</h1>
            <RegisterForm
                onSubmit={onRegister}
                loading={loading}
            />
            <Link href="/login">
                <span>Have an account?</span>
            </Link>
        </>
    );
}

export const getServerSideProps = withoutAuth()