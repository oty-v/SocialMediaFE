import {useState} from 'react'
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "../components/auth/registerForm";
import {withoutAuth} from "../lib/withoutAuth";
import {register} from "../redux/auth/action";

export default function Register() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const onRegister = async (inputs) => {
        setLoading(true);
        try {
            await dispatch(register(inputs));
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
            <div className="card">
                <div className="card-header central-column-header">
                    <h3>Sign Up</h3>
                </div>
                <div className="card-body">
                    <RegisterForm
                        onSubmit={onRegister}
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