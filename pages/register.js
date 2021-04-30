import Head from "next/head";
import Link from "next/link";

import RegisterForm from "../components/auth/registerForm";
import {axiosController} from "../lib/axiosController";
import {getProfile, registerUser} from "../api/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {parseCookies} from "../helpers/parseCookies";
import Cookie from "js-cookie";


export default function Register({isLoggedIn}) {
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) {
            router.push(`/`);
        }
    }, [isLoggedIn]);
    const onRegister = async (inputs) => {
        const token = await registerUser(inputs);
        axiosController.setToken(token.data.data.access_token);
        const {data} = await getProfile();
        Cookie.set('username', data.data.username);
        Cookie.set("token", token.data.data.access_token);
        router.push(`/`);
    }
    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Please register before login"/>
            </Head>
            <h1>Sign Up</h1>
            <RegisterForm onSubmit={onRegister}/>
            <Link href="/login">
                <span>Have an account?</span>
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