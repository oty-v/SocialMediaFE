import {ErrorMessage, useField} from 'formik';

export const InputField = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="field-container">
            <div className="field">
                <label htmlFor={field.name}>{label}</label>
                <input
                    className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                    {...field}
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