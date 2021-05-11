import {useRouter} from "next/router";
import {logoutUser} from "../../../api/auth";
import Cookie from "js-cookie";
import Header from "./header";
import {Bounce, ToastContainer} from "react-toastify";

function Layout({auth, isLoggedIn, children}) {
    const router = useRouter();
    const handleClickSignIn = () => {
        router.push(`/login`);
    }
    const handleClickSignUp = () => {
        router.push(`/register`);
    }
    const handleClickLogOut = async () => {
        try {
            await logoutUser();
            Cookie.remove("token");
            router.push('/login');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container-fluid d-flex flex-row">
            <Header
                authUser={auth?.user.username}
                isLoggedIn={isLoggedIn}
                handleClickSignIn={handleClickSignIn}
                handleClickSignUp={handleClickSignUp}
                handleClickLogOut={handleClickLogOut}
            />
            <main>
                <ToastContainer
                    draggable={false}
                    transition={Bounce}
                    autoClose={5000}
                />
                {children}
            </main>
        </div>
    )
}

export default Layout;