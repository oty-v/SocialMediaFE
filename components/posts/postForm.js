import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Loader from "../common/Loader";
import {TextField} from '../common/field/textField';

function PostForm({
                      onSubmit,
                      loading,
                      post = {
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
            initialValues={post}
            validationSchema={validationSchema}
            onSubmit={async values => {
                await onSubmit(values)
                if(!post.content) {
                    values.body = ''
                }
            }}
        >
            <Form>
                <TextField
                    label="Write your post"
                    name="content"
                    type="text"
                />
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? (<Loader/>) : ("Save")}
                </button>
            </Form>
        </Formik>
    )
}

export default PostForm;