import {Formik, Form} from 'formik';
import {TextField} from '../common/field/textField';
import * as Yup from 'yup';

function PostForm({
                      onSubmit,
                      setEditMode,
                      initialPost = {
                          content: ''
                      }
                  }) {
    const validationSchema = Yup.object({
        content: Yup.string()
            .max(280, 'Must be 280 characters or less')
            .required('Required'),
    })
    return (
        <Formik
            initialValues={initialPost}
            validationSchema={validationSchema}
            onSubmit={values => {
                onSubmit(values)
                setEditMode(false)
            }}
        >
            <Form>
                <TextField
                    label="Write your post"
                    name="content"
                    type="text"
                />
                <button className="btn btn-primary" type="submit">Save</button>
            </Form>
        </Formik>
    )
}

export default PostForm;