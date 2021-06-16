import {useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "../components/auth/loginForm";
import {withoutAuth} from "../lib/withoutAuth";
import {login} from "../redux/auth/action";

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleUserLogin = async (credentials) => {
        setLoading(true);
        try {
            await dispatch(login(credentials));
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
            <div className="card">
                <div className="card-header central-column-header bg-transparent">
                    <h3>Sign in</h3>
                </div>
                <div className="card-body">
                    <LoginForm
                        onSubmit={handleUserLogin}
                        loading={loading}
                    />
                    <Link href="/register">
                        <span className="text-muted">Need an account?</span>
                    </Link>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = withoutAuth()