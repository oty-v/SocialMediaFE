const ListItem = ({customClassName, children}) => {
    const className = customClassName ? `list-group-item ${customClassName}` : 'list-group-item'
    return (
        <li className={className}>
            {children}
        </li>
    )
}
export default ListItem;