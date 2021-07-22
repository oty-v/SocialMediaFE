import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import SaveButton from "../common/buttons/SaveButton";
import MentionsInput from "../common/field/mentionsField/MentionsInput";

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
            render={({
                         values,
                         setFieldValue
                     }) => {
                return (
                    <Form>
                        <MentionsInput value={values.content} onChange={value => setFieldValue("content", value)}/>
                        <div className="float-end">
                            <SaveButton loading={loading}/>
                        </div>
                    </Form>
                )
            }}
        />
    )
}

export default CommentForm;