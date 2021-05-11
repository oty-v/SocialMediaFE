import ActiveLink from "./ActiveLink";

const Header = ({
                    authUser,
                    isLoggedIn,
                    handleClickSignIn,
                    handleClickSignUp,
                    handleClickLogOut
                }) => {
    return (
        <header>
            <nav>
                <ul className="position-fixed nav flex-column nav-pills justify-content-center">
                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleClickSignIn}>Sign in</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleClickSignUp}>Sign up</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <ActiveLink activeClassName="active" href="/">
                                    <span className="nav-link">Home</span>
                                </ActiveLink>
                            </li>
                            <li className="nav-item">
                                <ActiveLink activeClassName="active" href={`/${authUser}`}>
                                    <span className="nav-link">Profile</span>
                                </ActiveLink>
                            </li>
                            <li className="nav-item">
                                <ActiveLink activeClassName="active" href={`/${authUser}/posts`}>
                                    <span className="nav-link">My posts</span>
                                </ActiveLink>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleClickLogOut}>Log out</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;