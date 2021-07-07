import BackButton from "../../buttons/BackButton";
import CardBody from "../../card/CardBody";
import List from "../../list/List";
import ListItem from "../../list/ListItem";
import CardHeader from "../../card/CardHeader";

const ContentBody = ({children}) => <CardBody><List>{children}</List></CardBody>

const MiddleContent = ({tagName, username, title, backBtn, children}) => {
    return (
        <div className="central-column">
            <CardHeader customClassName={'central-column-header bg-transparent'}>
                {!!backBtn && <BackButton/>}
                <div className="central-column-header-title">
                    {!!title && <h3 className="mb-0">{title}</h3>}
                    {!!username && <span className="text-muted">{`@${username}`}</span>}
                    {!!tagName && <span className="text-muted">{`#${tagName}`}</span>}
                </div>
            </CardHeader>
            {children}
        </div>
    )
}

export default Object.assign(MiddleContent, {
    Item: ListItem,
    Body: ContentBody,
});