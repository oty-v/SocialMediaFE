import {Formik, Form} from 'formik';
import {InputField} from '../inputField';
import * as Yup from 'yup';

const RegisterForm = ({onSubmit}) => {
    const validate = Yup.object({
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
            validationSchema={validate}
            onSubmit={values => {
                onSubmit(values)
            }}
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
                <button type="submit">Sign Up</button>
                <button type="reset">Reset</button>
            </Form>
        </Formik>
    );
};

export default RegisterForm;