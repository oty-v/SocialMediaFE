import Link from 'next/link'
import {useRouter} from 'next/router'

const Header = ({
                    authUser,
                    isLoggedIn,
                    handleClickSignIn,
                    handleClickSignUp,
                    handleClickLogOut
                }) => {
    const router = useRouter()
    return (
        <header>
            <nav>
                <ul className="nav">
                    {!isLoggedIn ? (
                        <>
                            <li>
                                <button onClick={handleClickSignIn}>Sign in</button>
                            </li>
                            <li>
                                <button onClick={handleClickSignUp}>Sign up</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${authUser}`}>
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${authUser}/posts`}>
                                    <span>My posts</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleClickLogOut}>Log out</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;