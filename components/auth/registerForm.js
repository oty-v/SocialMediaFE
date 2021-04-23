import {useState} from "react";

const RegisterForm = ({onSubmit}) => {
    const [inputsUser, setInputsUser] = useState({});
    const handleSubmit = async (event, User) => {
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
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Index"
                    required
                />
            </fieldset>
            <fieldset>
                <input
                    onChange={(event) => handleInputChange("email", event.target.value)}
                    value={inputsUser.email}
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    required
                />
            </fieldset>
            <fieldset>
                <input
                    onChange={(event) => handleInputChange("password", event.target.value)}
                    value={inputsUser.password}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    required
                />
            </fieldset>
            <fieldset>
                <input
                    onChange={(event) => handleInputChange("password_confirmation", event.target.value)}
                    value={inputsUser.password_confirmation}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Confirm password"
                    required
                />
            </fieldset>
            <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
            >
                Sign up
            </button>
        </form>
    );
};

export default RegisterForm;