import {contentParser} from "../helpers/contentParser";

const ParsedContent = ({parsedUsers, contentClass, linkClass, children}) => {
    const parsedContent = contentParser(children, parsedUsers, linkClass)
    return (
        <div className={contentClass}>
            {parsedContent}
        </div>
    );
}


export default ParsedContent;
