const CardFooter = ({customClassName = '', children}) => {
    return (
        <div className={`card-footer ${customClassName}`}>
            {children}
        </div>
    )
}

export default CardFooter;