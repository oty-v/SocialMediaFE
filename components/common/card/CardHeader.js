const CardHeader = ({customClassName = '', children}) => {
    return (
        <div className={`card-header ${customClassName}`}>
            {children}
        </div>
    )
}

export default CardHeader;