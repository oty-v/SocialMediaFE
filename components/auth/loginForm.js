import {useState} from "react";

const LoginForm = ({onSubmit}) => {
    const [inputsUser, setInputsUser] = useState({});
    const handleSubmit = (event, user) => {
        if (event) {
            event.preventDefault();
        }
        onSubmit(user);
    }
    const handleInputChange = (key, value) => {
        setInputsUser(inputsUser => ({...inputsUser, [key]: value}));
    }
    return (
        <form onSubmit={(event) => handleSubmit(event, inputsUser)}>
            <fieldset>
                <input
                    onChange={(event) => handleInputChange("email", event.target.value)}
                    value={inputsUser.email}
                    type="email"
                    placeholder="Email"
                    required
                />
            </fieldset>

            <fieldset>
                <input
                    onChange={(event) => handleInputChange("password", event.target.value)}
                    value={inputsUser.password}
                    type="password"
                    placeholder="Password"
                    required
                />
            </fieldset>

            <button
                type="submit"
            >
                Sign in
            </button>
        </form>
    );
};

export default LoginForm;