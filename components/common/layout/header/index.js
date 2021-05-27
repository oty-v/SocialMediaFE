import ActiveLink from "./ActiveLink";
import HomeIcon from "../../../../public/icon/home.svg";
import ProfileIcon from "../../../../public/icon/account.svg";
import PostIcon from "../../../../public/icon/list.svg";
import LogoutIcon from "../../../../public/icon/logout.svg";

const Header = ({
                    authUser,
                    isLoggedIn,
                    handleClickSignIn,
                    handleClickSignUp,
                    handleClickLogOut
                }) => {
    const navList = (isLoggedIn) => {
        if (isLoggedIn) {
            return (
                <>
                    <li className="nav-item mt-2">
                        <ActiveLink activeClassName="active" href="/">
                            <div className="nav-link link-dark">
                                <HomeIcon className="me-1 pb-1" height="2rem"/>
                                <span>Home</span>
                            </div>
                        </ActiveLink>
                    </li>
                    <li className="nav-item mt-3">
                        <ActiveLink activeClassName="active" href={`/${authUser}`}>
                            <div className="nav-link link-dark ">
                                <ProfileIcon className="me-1 pb-1" height="2rem"/>
                                <span>Profile</span>
                            </div>
                        </ActiveLink>
                    </li>
                    <li className="nav-item mt-3">
                        <ActiveLink activeClassName="active" href={`/${authUser}/posts`}>
                            <div className="nav-link link-dark">
                                <PostIcon className="me-1 mb-1" height="2rem"/>
                                <span>My Posts</span>
                            </div>
                        </ActiveLink>
                    </li>
                    <li className="nav-item mt-3">
                        <button className="nav-link link-dark" onClick={handleClickLogOut}>
                            <LogoutIcon className="me-1 pb-1" height="2rem"/>
                            <span>Logout</span>
                        </button>
                    </li>
                </>
            )
        }
        return (
            <>
                <li className="nav-item m-3">
                    <button className="nav-link link-dark" onClick={handleClickSignIn}>Sign in</button>
                </li>
                <li className="nav-item m-3">
                    <button className="nav-link link-dark" onClick={handleClickSignUp}>Sign up</button>
                </li>
            </>
        )
    }
    return (
        <header>
            <nav>
                <ul className="position-fixed nav flex-column nav-pills justify-content-center mt-5 ms-5">
                    {navList(isLoggedIn)}
                </ul>
            </nav>
        </header>
    )
}

export default Header;