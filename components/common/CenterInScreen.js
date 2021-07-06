const CenterInScreen = ({children, customClassName}) => {
    const className = customClassName ?
        `d-flex flex-column justify-content-center align-items-center ${customClassName}` :
        'd-flex flex-column justify-content-center align-items-center'
    return (
        <div className={className}>
            {children}
        </div>
    )
}
export default CenterInScreen