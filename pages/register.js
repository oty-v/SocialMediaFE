import Head from "next/head";
import Link from "next/link";

import RegisterForm from "../components/auth/registerForm";
import {registerUser} from "../lib/api";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {parseCookies} from "../lib/parseCookies";


export default function Register({isLoggedIn}) {
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) {
            router.push(`/`);
        }
    });
    const onRegister = async (inputs) => {
        const {status} = await registerUser(inputs);
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
    if(!token){
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