import {ErrorMessage, useField} from 'formik';

export const InputImageField = ({setFieldValue, label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="field-container">
            <div className="field">
                <label htmlFor={field.name}>{label}</label>
                <input
                    className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                    onChange={(event) => {
                        setFieldValue(field.name, event.target.files[0]);
                    }}
                    {...props}
                />
            </div>
            <ErrorMessage
                component="span" name={field.name}
                className="error"
            />
        </div>
    )
}

// export default InputImageField;