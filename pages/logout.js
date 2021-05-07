import {useRouter} from "next/router";
import Head from "next/head";
import Cookie from "js-cookie";
import {logoutUser} from "../api/auth";
import {useEffect} from "react";

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        try {
            logoutUser()
        } catch (e) {
            console.log(e);
        }
        Cookie.remove("token");
        router.push('login');
    })
    return (
        <>
            <Head>
                <title>Logout</title>
            </Head>
            <div>Loading...</div>
        </>
    );
}