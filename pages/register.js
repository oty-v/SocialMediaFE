import Head from "next/head";
import Link from "next/link";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "../components/auth/registerForm";
import {registerUser} from "../api/auth";
import {useRouter} from "next/router";
import Cookie from "js-cookie";
import {withoutAuth} from "../lib/withoutAuth";


export default function Register() {
    const router = useRouter();
    const onRegister = async (inputs) => {
        try {
            const {data: {data: {access_token: accessToken}}} = await registerUser(inputs);
            Cookie.set("token", accessToken);
            router.push(`/`);
        } catch (error) {
            toast.error(error.toString())
        }
    }
    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Please register before login"/>
            </Head>
            <ToastContainer
                draggable={false}
                transition={Bounce}
                autoClose={5000}
            />
            <h1>Sign Up</h1>
            <RegisterForm onSubmit={onRegister}/>
            <Link href="/login">
                <span>Have an account?</span>
            </Link>
        </>
    );
}

export const getServerSideProps = withoutAuth()