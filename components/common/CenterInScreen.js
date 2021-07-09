const CenterInScreen = ({children, customClassName = ''}) => {
    return (
        <div className={`d-flex flex-column justify-content-center align-items-center ${customClassName}`}>
            {children}
        </div>
    )
}
export default CenterInScreen