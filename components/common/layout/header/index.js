import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import ActiveLink from "./ActiveLink";

const Header = ({
                    authUser,
                    handleClickSignIn,
                    handleClickSignUp,
                    handleClickLogOut
                }) => {
    const navList = (authUser) => {
        if (authUser) {
            return (
                <>
                    <li className="nav-item mt-2">
                        <ActiveLink activeClassName="active" href="/">
                            <div className="nav-link link-dark">
                                <FontAwesomeIcon className="me-2" icon="home" size="lg"/>
                                <span>Home</span>
                            </div>
                        </ActiveLink>
                    </li>
                    <li className="nav-item mt-3">
                        <ActiveLink activeClassName="active" href={`/${authUser}`}>
                            <div className="nav-link link-dark ">
                                <FontAwesomeIcon className="me-2" icon="user" size="lg"/>
                                <span>Profile</span>
                            </div>
                        </ActiveLink>
                    </li>
                    <li className="nav-item mt-3">
                        <ActiveLink activeClassName="active" href={`/${authUser}/posts`}>
                            <div className="nav-link link-dark">
                                <FontAwesomeIcon className="me-2" icon="stream" size="lg"/>
                                <span>My Posts</span>
                            </div>
                        </ActiveLink>
                    </li>
                    <li className="nav-item mt-3">
                        <button className="nav-link link-dark" onClick={handleClickLogOut}>
                            <FontAwesomeIcon className="me-2" icon="sign-out-alt" size="lg"/>
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
                    {navList(authUser)}
                </ul>
            </nav>
        </header>
    )
}

export default Header;