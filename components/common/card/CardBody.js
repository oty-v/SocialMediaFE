const CardBody = ({customClassName, children}) => {
    const className = customClassName ? `card-body ${customClassName}` : 'card-body'
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default CardBody;