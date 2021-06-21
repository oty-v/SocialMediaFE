import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import Header from "./header";
import {Bounce, toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {logout} from "../../../redux/auth/action";
import {getQuery} from "@redux-requests/core";
import {useQuery} from "@redux-requests/react";
import {FETCH_PROFILE} from "../../../redux/auth/types";

function Layout({children}) {
    const router = useRouter();
    const {data} = useQuery({ type: FETCH_PROFILE });
    const authUser = data?.username;
    const dispatch = useDispatch();
    const handleClickSignIn = () => {
        router.push(`/login`);
    }
    const handleClickSignUp = () => {
        router.push(`/register`);
    }
    const handleClickLogOut = async () => {
        try {
            dispatch(logout());
            router.push('/login');
        } catch (error) {
            toast.error(error.toString())
        }
    }
    return (
        <div className="container-fluid d-flex flex-row">
            <ToastContainer
                draggable={false}
                transition={Bounce}
                autoClose={5000}
            />
            <Header
                authUser={authUser}
                handleClickSignIn={handleClickSignIn}
                handleClickSignUp={handleClickSignUp}
                handleClickLogOut={handleClickLogOut}
            />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout;