import Link from "next/link";

import '../styles/globals.css';

function MyApp({Component, pageProps}) {
    return (
        <div className="container">
            <header>
                <ul className="nav">
                    <li>
                        <Link href="/">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/posts">
                            <span>Posts list</span>
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