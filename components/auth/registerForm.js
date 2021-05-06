import {useState} from "react";

const RegisterForm = ({onSubmit}) => {
    const [inputsUser, setInputsUser] = useState({});
    const handleSubmit = (event, User) => {
        if (event) {
            event.preventDefault();
        }
        onSubmit(User);
    }
    const handleInputChange = (key, value) => {
        setInputsUser(inputsUser => ({...inputsUser, [key]: value}));
    }
    return (
        <form onSubmit={(event) => handleSubmit(event, inputsUser)}>
            <fieldset>
                <input
                    onChange={(event) => handleInputChange("username", event.target.value)}
                    value={inputsUser.username}
                    type="text"
                    placeholder="Username"
                    required
                />
            </fieldset>
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
            <fieldset>
                <input
                    onChange={(event) => handleInputChange("password_confirmation", event.target.value)}
                    value={inputsUser.password_confirmation}
                    type="password"
                    placeholder="Confirm password"
                    required
                />
            </fieldset>
            <button type="submit">
                Sign up
            </button>
        </form>
    );
};

export default RegisterForm;