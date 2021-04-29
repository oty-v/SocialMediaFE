import {Formik, Form} from 'formik';
import {InputField} from '../inputField';
import * as Yup from 'yup';

const LoginForm = ({onSubmit}) => {
    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    })
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={validate}
            onSubmit={values => {
                onSubmit(values)
            }}
        >
            <Form>
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
                <button type="submit">Sign In</button>
                <button type="reset">Reset</button>
            </Form>
        </Formik>
    );
};

export default LoginForm;