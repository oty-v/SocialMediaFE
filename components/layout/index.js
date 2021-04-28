import {useRouter} from "next/router";
import {logoutUser} from "../../lib/api";
import Cookie from "js-cookie";
import Header from "./header";

function Layout({isLoggedIn, children}) {
    const router = useRouter();
    const authUser = Cookie.get("username");
    const handleClickSignIn = () => {
        router.push(`/login`);
    }
    const handleClickSignUp = () => {
        router.push(`/register`);
    }
    const handleClickLogOut = async () => {
        await logoutUser();
        Cookie.remove("token");
        Cookie.remove("username");
        router.push('/login');
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
                {children}
            </main>
            <footer>
                <p>2021 @oty-v</p>
            </footer>
        </div>
    )
}

export default Layout;