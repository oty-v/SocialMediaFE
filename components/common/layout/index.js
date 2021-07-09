import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import Header from "./header";
import {Bounce, ToastContainer} from "react-toastify";

import {fetchProfile, logout} from "../../../redux/auth/action";
import {useQuery} from "@redux-requests/react";

function Layout({children}) {
    const router = useRouter();
    const {data} = useQuery({ type: fetchProfile });
    const authUser = data?.username;
    const dispatch = useDispatch();

    const handleClickSignIn = () => {
        router.push(`/login`);
    };

    const handleClickSignUp = () => {
        router.push(`/register`);
    };

    const handleClickLogOut = async () => {
            await dispatch(logout());
            router.push('/login');
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