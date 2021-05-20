import {ErrorMessage, useField} from 'formik';

export const TextField = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="field-container">
            <div className="field">
                <label htmlFor={field.name}>{label}</label>
                <textarea
                    className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                    rows="6"
                    cols="48"
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