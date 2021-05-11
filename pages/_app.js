import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import Layout from "../components/common/layout";
import {AuthTokenChecker} from "../components/hoc/authTokenChecker";

function MyApp({Component, pageProps}) {
    return (
        <AuthTokenChecker>
            <Layout {...pageProps}>
                <Component {...pageProps}/>
            </Layout>
        </AuthTokenChecker>
    )
}

export default MyApp