import Cookie from "js-cookie";
import {axiosController} from "../../lib/axiosController";

export const AuthTokenChecker = ({children}) => {
    const authToken = Cookie.get("token");
    axiosController.setToken(authToken);
    return children
}