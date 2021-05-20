import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Loader from "../common/Loader";
import {InputField} from '../common/field/inputField';

const RegisterForm = ({onSubmit, loading}) => {
    const validationSchema = Yup.object({
        username: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .required('Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
    })
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                password_confirmation: ''
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <InputField
                    label="Username"
                    name="username"
                    type="text"
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                />
                <InputField
                    label="Confirm Password"
                    name="password_confirmation"
                    type="password"
                />
                <div className="field-container">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? (<Loader/>) : ("Sign Up")}
                    </button>
                    <button className="btn btn-light" type="reset">Reset</button>
                </div>
            </Form>
        </Formik>
    );
};

export default RegisterForm;