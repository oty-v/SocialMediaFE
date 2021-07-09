import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import {TextField} from '../common/field/textField';
import SaveButton from "../common/buttons/SaveButton";

const validationSchema = Yup.object({
    content: Yup.string()
        .max(280, 'Must be 280 characters or less')
        .required('Required'),
})

function CommentForm({onSubmit, loading, comment = {content: ''}}) {
    const handleSubmit = async (values, actions) => {
        await onSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm()
    };
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
                <SaveButton loading={loading} floatEnd/>
            </Form>
        </Formik>
    )
}

export default CommentForm;