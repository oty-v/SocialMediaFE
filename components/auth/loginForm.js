import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Loader from "../common/Loader";
import {InputField} from '../common/field/inputField';

const LoginForm = ({onSubmit, loading}) => {
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
                <div className="field-container">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? (<Loader/>) : ("Sign In")}
                    </button>
                    <button className="btn btn-light" type="reset">Reset</button>
                </div>
            </Form>
        </Formik>
    );
};

export default LoginForm;