import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import NavLink from "./NavLink";

const Header = ({authUser, handleClickSignIn, handleClickSignUp, handleClickLogOut}) => {
    const navList = (authUser) => {
        if (authUser) {
            return (
                <>
                    <NavLink href={"/"}>
                        <FontAwesomeIcon className="me-2" icon="home" size="lg"/>
                        <span>Home</span>
                    </NavLink>
                    <NavLink href={`/${authUser}`}>
                        <FontAwesomeIcon className="me-2" icon="user" size="lg"/>
                        <span>Profile</span>
                    </NavLink>
                    <NavLink href={`/${authUser}/posts`}>
                        <FontAwesomeIcon className="me-2" icon="user" size="lg"/>
                        <span>My Posts</span>
                    </NavLink>
                    <NavLink onClick={handleClickLogOut}>
                        <FontAwesomeIcon className="me-2" icon="sign-out-alt" size="lg"/>
                        <span>Logout</span>
                    </NavLink>
                </>
            )
        }
        return (
            <>
                <NavLink href={'/login'} onClick={handleClickSignIn}>
                    SignIn
                </NavLink>
                <NavLink href={'/register'} onClick={handleClickSignUp}>
                    SignUp
                </NavLink>
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