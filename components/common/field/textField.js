import {ErrorMessage, useField} from 'formik';

export const TextField = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-floating mb-2">
            <textarea
                className={`form-control ${meta.touched && meta.error && 'is-invalid'}`}
                placeholder={label}
                id={field.name}
                {...field}
                {...props}
            />
            <label htmlFor={field.name} className="form-label">{label}</label>
            <ErrorMessage
                component="span" name={field.name}
                className="error"
            />
        </div>
    )
}