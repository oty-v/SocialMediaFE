const CardHeader = ({customClassName, children}) => {
    const className = customClassName ? `card-header ${customClassName}` : 'card-header'
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default CardHeader;