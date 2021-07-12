const CardBody = ({customClassName = '', children}) => {
    return (
        <div className={`card-body ${customClassName}`}>
            {children}
        </div>
    )
}

export default CardBody;