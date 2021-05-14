import { Provider } from 'react-redux'
import {useStore} from "../redux/store";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import Layout from "../components/common/layout";
import {AuthTokenChecker} from "../components/hoc/authTokenChecker";

function MyApp({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState)
    return (
        <Provider store={store}>
            <AuthTokenChecker>
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </AuthTokenChecker>
        </Provider>
    )
}

export default MyApp;