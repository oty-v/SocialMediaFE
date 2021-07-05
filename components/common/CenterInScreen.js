export const CenterInScreen = ({children, additionalClassName}) => {
    return (
        <div className={`d-flex flex-column justify-content-center align-items-center ${additionalClassName}`}>
            {children}
        </div>
    )
}