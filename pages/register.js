import {useCallback} from 'react'
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

import RegisterForm from "../components/auth/registerForm";
import {withoutAuth} from "../lib/withoutAuth";
import {register} from "../redux/auth/action";
import {useQuery} from "@redux-requests/react";
import CenterInScreen from "../components/common/CenterInScreen";
import Card from "../components/common/card/Card";

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
            <CenterInScreen customClassName={'vh-100'}>
                <Card>
                    <Card.Header>
                        <h3>Sign Up</h3>
                    </Card.Header>
                    <Card.Body>
                        <RegisterForm
                            onSubmit={handleUserRegister}
                            loading={loading}
                        />
                        <Link href="/login">
                            <span className="text-muted">Have an account?</span>
                        </Link>
                    </Card.Body>
                </Card>
            </CenterInScreen>
        </>
    );
}

export const getServerSideProps = withoutAuth()