import CardBody from "./CardBody";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";

const CustomCardHeader = ({children}) => {
    return <CardHeader customClassName={'bg-transparent'}>{children}</CardHeader>
}
const Card = ({customClassName, children}) => {
    const className = customClassName ? `card ${customClassName}` : 'card'
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Object.assign(Card, {
    Header: CustomCardHeader,
    Body: CardBody,
    Footer: CardFooter,
});