import {useCallback} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import {useDispatch} from "react-redux";

import LoginForm from "../components/auth/loginForm";
import {withoutAuth} from "../lib/withoutAuth";
import {login} from "../redux/auth/action";
import {useQuery} from "@redux-requests/react";
import Card from "../components/common/card/Card";
import CenterInScreen from "../components/common/CenterInScreen";

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const {loading} = useQuery({type: login})
    const handleUserLogin = useCallback(async (credentials) => {
        await dispatch(login(credentials));
        router.push(`/`);
    }, []);
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <CenterInScreen customClassName={'vh-100'}>
                <Card>
                    <Card.Header>
                        <h3>Sign in</h3>
                    </Card.Header>
                    <Card.Body>
                        <LoginForm
                            onSubmit={handleUserLogin}
                            loading={loading}
                        />
                        <Link href="/register">
                            <span className="text-muted">Need an account?</span>
                        </Link>
                    </Card.Body>
                </Card>
            </CenterInScreen>
        </>
    );
}

export const getServerSideProps = withoutAuth()