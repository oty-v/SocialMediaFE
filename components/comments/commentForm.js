import {Formik, Form} from 'formik';
import {TextField} from '../common/field/textField';
import * as Yup from 'yup';

function CommentForm({
                         onSubmit,
                         setEditMode,
                         initialComment = {
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
            initialValues={initialComment}
            validationSchema={validationSchema}
            onSubmit={values => {
                onSubmit(values)
                setEditMode(false)
            }}
        >
            <Form>
                <TextField
                    label="Write your comment"
                    name="body"
                    type="text"
                />
                <button className="btn btn-primary" type="submit">Send</button>
            </Form>
        </Formik>
    )
}

export default CommentForm;