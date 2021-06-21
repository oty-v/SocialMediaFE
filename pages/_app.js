import {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {configureStore, useStore} from "../redux/store";
import 'bootstrap/dist/css/bootstrap.css';
import "react-toastify/dist/ReactToastify.css";

import '../styles/globals.css';
import '../lib/fontawesome.js';
import Layout from "../components/common/layout";
import {AuthTokenChecker} from "../components/hoc/authTokenChecker";
import Loader from '../components/common/Loader';

function useMounted() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    return mounted
}

function MyApp({Component, pageProps}) {
    const {store} = configureStore(pageProps.initialReduxState)
    const isMounted = useMounted()
    if (!isMounted) {
        return (
            <div className="vh-100 d-flex flex-column  justify-content-center align-items-center">
                <Loader/>
            </div>
        )
    }
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