import Link from 'next/link';
import Head from "next/head";

export default function BasePage(props) {
    return (
        <div className="container">
            <Head>
                <title>{props.pageTitle}</title>
            </Head>
            <header>
                <ul>
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
                {props.children}
            </main>
            <footer>
                <p>2021 @oty-v</p>
            </footer>

            <style jsx>{`
                .container {
                  min-height: 100vh;
                  padding: 0 0.5rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
                ul {
                  width: 25vw;
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                }
                main {
                  padding: 5rem 0;
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
        
                footer {
                  width: 100%;
                  height: 100px;
                  border-top: 1px solid #eaeaea;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
            `}</style>
        </div>
    )
}
