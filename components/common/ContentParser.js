import React, {useCallback, useMemo} from 'react';
import Link from "next/link";

const REGEX_URL = /(?:\s)(f|ht)tps?:\/\/([^\s\t\r\n<]*[^\s\t\r\n<)*_,\.])/g,
    REGEX_HASHTAG = /#(\w+)/;

const ContentParser = ({parsedUsers, contentClass, linkClass, children}) => {
    const generateLink = useCallback((key, url, text) => {
        return (
            <span className={linkClass} key={key}>
                <Link href={`/${url}`}>{text || url}</Link>
            </span>
        )
    },[linkClass]);

    const parsedUsernames = useCallback(parsedUsers.reduce((values, item) => {
        item.username && values.push(`@${item.username}`);
        return values;
    }, []),[parsedUsers]);

    const content = useCallback(children.split(' ').reduce((content, word, key) => {
        if (parsedUsernames.find((username) => username === word)) {
            content.push(generateLink(key, word.match(/@(\w+)/)[1], word));
            return content;
        }
        if (word.match(REGEX_HASHTAG)) {
            content.push(generateLink(key, `hashtag/${word.match(REGEX_HASHTAG)[1]}`, word));
            return content;
        }
        if (word.match(REGEX_URL)) {
            content.push(generateLink(key, word));
            return content;
        }
        const lastWord = content[content.length - 1]
        if (typeof lastWord === 'string') {
            content.splice(content.length - 1, 1, `${lastWord} ${word}`);
            return content;
        }
        content.push(word);
        return content
    }, []),[children]);

    return (
        <div className={contentClass}>
            {content}
        </div>
    );
}


export default ContentParser;
