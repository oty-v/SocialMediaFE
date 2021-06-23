import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Loader from "../common/Loader";
import {TextField} from '../common/field/textField';
import {useCallback} from "react";

const validationSchema = Yup.object({
    content: Yup.string()
        .max(280, 'Must be 280 characters or less')
        .required('Required'),
})

function CommentForm({onSubmit, loading, comment = {content: ''}}) {
    const handleSubmit = useCallback(async (values, actions) => {
        await onSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm()
    }, [onSubmit]);
    return (
        <Formik
            initialValues={comment}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <TextField
                    label="Write your comment"
                    name="content"
                    type="text"
                />
                <button
                    className="btn btn-primary float-end m-1"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (<Loader/>) : ("Send")}
                </button>
            </Form>
        </Formik>
    )
}

export default CommentForm;