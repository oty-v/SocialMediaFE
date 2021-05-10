import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import Cookie from "js-cookie";

import LoginForm from "../components/auth/loginForm";
import {loginUser} from "../api/auth";
import {withoutAuth} from "../lib/withoutAuth";
import ToastMessage from "../components/common/toastMessage";

export default function Login() {
    const [error, setError] = useState('');
    const router = useRouter();
    const onLogin = async (inputs) => {
        try {
            const {data: {data: {access_token: accessToken}}} = await loginUser(inputs);
            Cookie.set("token", accessToken);
            router.push(`/`);
        } catch (error) {
            setError(error.toString())
        }
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <ToastMessage type='error' message={error} handleClick={()=>setError('')}/>
            <h1>Sign in</h1>
            <LoginForm onSubmit={onLogin}/>
            <Link href="/register">
                <span>Need an account?</span>
            </Link>
        </>
    );
}

export const getServerSideProps = withoutAuth()