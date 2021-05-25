import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import Header from "./header";
import {Bounce, toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {logout} from "../../../redux/auth/action";

function Layout({children}) {
    const router = useRouter();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const authUser = auth.profile.username;
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
                isLoggedIn={auth.isLoggedIn}
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