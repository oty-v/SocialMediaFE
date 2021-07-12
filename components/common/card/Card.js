import CardBody from "./CardBody";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";

const CustomCardHeader = ({customClassName = '', children}) => {
    return <CardHeader customClassName={`bg-transparent ${customClassName}`}>{children}</CardHeader>
}
const Card = ({customClassName = '', children}) => {
    return (
        <div className={`card ${customClassName}`}>
            {children}
        </div>
    )
}

export default Object.assign(Card, {
    Header: CustomCardHeader,
    Body: CardBody,
    Footer: CardFooter,
});