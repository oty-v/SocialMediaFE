import ListItem from "./ListItem";

const CustomListItem = ({customClassName = '', children}) => <ListItem customClassName={`list-group-item-action ${customClassName}`}>{children}</ListItem>

const List = ({customClassName = '', children}) => {
    return (
        <ul className={`list-group list-group-flush ${customClassName}`}>
            {children}
        </ul>
    )
}

export default Object.assign(List, {
    Item: CustomListItem,
});