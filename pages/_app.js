import '../styles/globals.css';
import Link from "next/link";

function MyApp({Component, pageProps}) {
    return (
        <div className="container">
            <header>
                <ul className="nav">
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/posts">
                            <a>Posts list</a>
                        </Link>
                    </li>
                </ul>
            </header>
            <main>
                <Component {...pageProps} />
            </main>
            <footer>
                <p>2021 @oty-v</p>
            </footer>
        </div>
    )
}

export default MyApp