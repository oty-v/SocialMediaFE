import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {logoutUser} from "../lib/api";
import Cookie from "js-cookie";
import Header from "../components/header";
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authUser, setAuthUser] = useState('');
    const router = useRouter();
    useEffect(async () => {
        const token = Cookie.get("token");
        const username = Cookie.get("username");
        if (token && username) {
            setIsLoggedIn(true);
            setAuthUser(username);
        }
    });
    const handleClickSignIn = () => {
        router.push(`/login`)
    }
    const handleClickSignUp = () => {
        router.push(`/register`)
    }
    const handleClickLogOut = async () => {
        await logoutUser();
        Cookie.remove("token");
        Cookie.remove("username");
        setIsLoggedIn(false);
        setAuthUser(null);
    }
    return (
        <div className="container">
            <Header
                authUser={authUser}
                isLoggedIn={isLoggedIn}
                handleClickSignIn={handleClickSignIn}
                handleClickSignUp={handleClickSignUp}
                handleClickLogOut={handleClickLogOut}
            />
            <main>
                <Component {...pageProps}/>
            </main>
            <footer>
                <p>2021 @oty-v</p>
            </footer>
        </div>
    )
}

export default MyApp