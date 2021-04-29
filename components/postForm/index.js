import {Formik, Form} from 'formik';
import {TextField} from '../textField';
import * as Yup from 'yup';
import styles from '../../styles/postForm.module.css';

function PostForm({
                      onSubmit,
                      initialPost = {
                          content: ''
                      }
                  }) {
    const validate = Yup.object({
        content: Yup.string()
            .max(280, 'Must be 280 characters or less')
            .required('Required'),
    })
    return (
        <Formik
            initialValues={initialPost}
            validationSchema={validate}
            onSubmit={values => {
                onSubmit(values)
            }}
        >
            <Form className={styles.form}>
                <TextField
                    label="Write your post"
                    name="content"
                    type="text"
                />
                <button type="submit">Save</button>
            </Form>
        </Formik>
    )
}

export default PostForm;
