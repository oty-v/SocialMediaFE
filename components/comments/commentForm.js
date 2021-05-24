import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Loader from "../common/Loader";
import {TextField} from '../common/field/textField';

function CommentForm({
                         onSubmit,
                         loading,
                         comment = {
                             body: ''
                         }
                     }) {
    const validationSchema = Yup.object({
        body: Yup.string()
            .max(280, 'Must be 280 characters or less')
            .required('Required'),
    })
    return (
        <Formik
            initialValues={comment}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                await onSubmit(values);
                actions.setSubmitting(false);
                actions.resetForm()
            }}
        >
            <Form>
                <TextField
                    label="Write your comment"
                    name="body"
                    type="text"
                />
                <button className="btn btn-primary float-end m-1" type="submit" disabled={loading}>
                    {loading ? (<Loader/>) : ("Send")}
                </button>
            </Form>
        </Formik>
    )
}

export default CommentForm;