const CardFooter = ({customClassName, children}) => {
    const className = customClassName ? `card-footer ${customClassName}` : 'card-footer'
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default CardFooter;