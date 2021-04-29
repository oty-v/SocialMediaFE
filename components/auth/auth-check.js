import {parseCookies} from "../../lib/parseCookies";
import {api, getProfile} from "../../lib/api";
import cookie from "cookie";
import Router from "next/router";

export default function AuthCheck({children}) {
    return children
}

AuthCheck.getInitialProps = async ({req}) => {
    const {token} = parseCookies(req);
    if(!token){
        return Router.push("/login")
    }
    api.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        return error.response
    });
    const {data} = await getProfile();
    cookie.serialize('username', data.data.username);
}

