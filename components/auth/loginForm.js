import {Formik, Form} from 'formik';
import {InputField} from '../common/field/inputField';
import * as Yup from 'yup';

const LoginForm = ({onSubmit}) => {
    const validationSchema = Yup.object({
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
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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
                <button className="btn btn-primary" type="submit">Sign In</button>
                <button className="btn btn-light" type="reset">Reset</button>
            </Form>
        </Formik>
    );
};

export default LoginForm;