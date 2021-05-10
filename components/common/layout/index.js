import {useRouter} from "next/router";
import {logoutUser} from "../../../api/auth";
import Cookie from "js-cookie";
import Header from "./header";

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
        <div className="container">
            <Header
                authUser={auth?.user.username}
                isLoggedIn={isLoggedIn}
                handleClickSignIn={handleClickSignIn}
                handleClickSignUp={handleClickSignUp}
                handleClickLogOut={handleClickLogOut}
            />
            <main>
                {children}
            </main>
            <footer>
                <p>2021 @oty-v</p>
            </footer>
        </div>
    )
}

export default Layout;