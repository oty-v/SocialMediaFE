import {useCallback} from 'react'
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "../components/auth/registerForm";
import {withoutAuth} from "../lib/withoutAuth";
import {register} from "../redux/auth/action";
import {useQuery} from "@redux-requests/react";

export default function Register() {
    const router = useRouter();
    const dispatch = useDispatch();
    const {loading} = useQuery({type: register})
    const handleUserRegister = useCallback(async (userData) => {
        await dispatch(register(userData));
        router.push(`/`);
    },[]);
    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Please register before login"/>
            </Head>
            <div className="card">
                <div className="card-header central-column-header bg-transparent">
                    <h3>Sign Up</h3>
                </div>
                <div className="card-body">
                    <RegisterForm
                        onSubmit={handleUserRegister}
                        loading={loading}
                    />
                    <Link href="/login">
                        <span className="text-muted">Have an account?</span>
                    </Link>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = withoutAuth()