const ListItem = ({customClassName = '', children}) => {
    return (
        <li className={`list-group-item ${customClassName}`}>
            {children}
        </li>
    )
}
export default ListItem;