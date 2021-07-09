import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import {InputField} from "../common/field/inputField";
import {InputImageField} from "../common/field/inputImageField";
import SaveButton from "../common/buttons/SaveButton";

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
const validationSchema = Yup.object({
    name: Yup.string()
        .max(50, 'Must be 25 characters or less')
        .required('Required'),
    avatar: Yup.mixed()
        .test(
            "fileSize",
            "File too large",
            (value) => {
                if (!value) return true
                return value.size <= FILE_SIZE
            }
        )
        .test(
            "fileFormat",
            "Unsupported Format",
            (value) => {
                if (!value) return true
                return SUPPORTED_FORMATS.includes(value.type)
            }
        ),
})

function ProfileForm({onSubmit, loading, profile = {name: ''}}) {
    const handleSubmit = async (values, actions) => {
        let data = new FormData();
        data.append("_method", "PUT");
        values.name && data.append("name", values.name);
        values.avatar && data.append("avatar", values.avatar);
        await onSubmit(profile.id, data);
        actions.setSubmitting(false);
        actions.resetForm()
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{name: profile.name}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >{({setFieldValue}) => (
            <Form>
                <InputImageField
                    setFieldValue={setFieldValue}
                    name="avatar"
                    type="file"
                    label="Choose your avatar"
                />
                <InputField
                    label="Write your name"
                    name="name"
                    type="text"
                />
                <SaveButton loading={loading} floatEnd/>
            </Form>
            )}
        </Formik>
    )
}

export default ProfileForm;