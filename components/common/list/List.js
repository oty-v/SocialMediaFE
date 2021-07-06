import ListItem from "./ListItem";

const CustomListItem = ({children}) => <ListItem customClassName={'list-group-item-action'}>{children}</ListItem>

const List = ({customClassName, children}) => {
    const className = customClassName ? `list-group list-group-flush ${customClassName}` : 'list-group list-group-flush'
    return (
        <ul className={className}>
            {children}
        </ul>
    )
}

export default Object.assign(List, {
    Item: CustomListItem,
});