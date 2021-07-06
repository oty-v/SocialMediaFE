import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import {TextField} from '../common/field/textField';
import {useCallback} from "react";
import LoaderButton from "../common/buttons/LoaderButton";
import SaveButton from "../common/buttons/SaveButton";

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
                <div className="float-end">
                    {loading ? (
                        <LoaderButton/>
                    ) : (
                        <SaveButton/>
                    )}
                </div>
            </Form>
        </Formik>
    )
}

export default PostForm;