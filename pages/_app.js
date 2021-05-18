import {useEffect, useState} from 'react'
import {Provider} from 'react-redux'
import {useStore} from "../redux/store";
import 'bootstrap/dist/css/bootstrap.css';

import '../styles/globals.css';
import Layout from "../components/common/layout";
import {AuthTokenChecker} from "../components/hoc/authTokenChecker";
import Loader from '../components/common/Loader'

function useMounted() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    return mounted
}

function MyApp({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState)
    const isMounted = useMounted()
    return (
        <Provider store={store}>
            <AuthTokenChecker>
                <Layout>
                    {isMounted ? (
                        <Component {...pageProps}/>
                    ) : (
                        <div className="vh-100 d-flex flex-column  justify-content-center align-items-center">
                            <Loader/>
                        </div>
                    )}
                </Layout>
            </AuthTokenChecker>
        </Provider>
    )
}

export default MyApp;