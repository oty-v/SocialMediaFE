import {Provider} from 'react-redux';
import {configureStore} from "../redux/store";
import 'bootstrap/dist/css/bootstrap.css';
import "react-toastify/dist/ReactToastify.css";

import '../styles/globals.css';
import '../lib/fontawesome.js';
import Layout from "../components/common/layout";
import {AuthTokenChecker} from "../components/hoc/authTokenChecker";

function MyApp({Component, pageProps}) {
    const {store} = configureStore(pageProps.initialReduxState)
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