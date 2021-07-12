import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import {InputField} from '../common/field/inputField';
import ResetButton from "../common/buttons/ResetButton";
import LoaderButton from "../common/buttons/LoaderButton";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
})

const initialValues = {
    email: '',
    password: ''
}

const LoginForm = ({onSubmit, loading}) => {
    const signInBtn = loading ? (
        <LoaderButton/>
    ) : (
        <button className="btn btn-primary m-1" type="submit">
            Sign In
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
                    {signInBtn}
                    <ResetButton/>
                </div>
            </Form>
        </Formik>
    );
};

export default LoginForm;