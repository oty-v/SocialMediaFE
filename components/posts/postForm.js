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

function PostForm({onSubmit, loading, post = {content: ''}}) {
    const handleSubmit = useCallback(async (values, actions) => {
        await onSubmit(values, post.id, post.cursor);
        actions.setSubmitting(false);
        actions.resetForm();
    }, [onSubmit]);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={post}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <TextField
                    label="Write your post"
                    name="content"
                    type="text"
                />
                <button
                    className="btn btn-primary float-end m-1"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (<Loader/>) : ("Save")}
                </button>
            </Form>
        </Formik>
    )
}

export default PostForm;