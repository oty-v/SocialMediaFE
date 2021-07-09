import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import {InputField} from '../common/field/inputField';
import ResetButton from "../common/buttons/ResetButton";
import LoaderButton from "../common/buttons/LoaderButton";

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

const initialValues = {
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
}

const RegisterForm = ({onSubmit, loading}) => {
    const signUpBtn = loading ? (
        <LoaderButton/>
    ) : (
        <button className="btn btn-primary m-1" type="submit">
            Sign Up
        </button>
    )
    return (
        <Formik
            initialValues={initialValues}
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
                    {signUpBtn}
                    <ResetButton/>
                </div>
            </Form>
        </Formik>
    );
};

export default RegisterForm;