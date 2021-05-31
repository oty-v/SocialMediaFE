import ActiveLink from "./ActiveLink";

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
                                <i className="me-2 fas fa-home fs-4"/>
                                <span>Home</span>
                            </div>
                        </ActiveLink>
                    </li>
                    <li className="nav-item mt-3">
                        <ActiveLink activeClassName="active" href={`/${authUser}`}>
                            <div className="nav-link link-dark ">
                                <i className="me-2 fas fa-user fs-4"/>
                                <span>Profile</span>
                            </div>
                        </ActiveLink>
                    </li>
                    <li className="nav-item mt-3">
                        <ActiveLink activeClassName="active" href={`/${authUser}/posts`}>
                            <div className="nav-link link-dark">
                                <i className="me-2 fas fa-stream fs-4"/>
                                <span>My Posts</span>
                            </div>
                        </ActiveLink>
                    </li>
                    <li className="nav-item mt-3">
                        <button className="nav-link link-dark" onClick={handleClickLogOut}>
                            <i className="me-2 fas fa-sign-out-alt fs-4"/>
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