import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {InputField} from "./field/inputField";

function SearchForm({onSubmit, maxSearchLength = 50, label= "Search", query = '',}) {
    const validationSchema = Yup.object({
        query: Yup.string()
            .max(maxSearchLength, `Must be ${maxSearchLength} characters or less`),
    })

    const handleSubmit = async (values) => {
        await onSubmit(values);
    };

    return (
        <Formik
            initialValues={{query}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >{({handleChange,submitForm}) => (
            <Form className="mb-3">
                <InputField
                    label={label}
                    name="query"
                    type="text"
                    onChange={async values => {
                        await handleChange(values);
                        await submitForm(values);
                    }}
                />
            </Form>
            )}
        </Formik>
    )
}

export default SearchForm;