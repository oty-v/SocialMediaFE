import Link from "next/link";

const REGEX_URL = /(f|ht)tps?:\/\/([^\s\t\r\n<]*[^\s\t\r\n<)*_,])/,
    REGEX_HASHTAG = /#(\w+)/;

const generateLink = (key, url, text, linkClass) => {
    return (
        <span className={linkClass} key={key}>
                <Link href={`${url}`}>{text}</Link>
        </span>
    )
};

const parsedUsernames = parsedUsers => parsedUsers.reduce((values, item) => {
    item.username && values.push(`@${item.username}`);
    return values;
}, []);

export const contentParser = (children, parsedUsers, linkClass) => {
    const wordsArray = (typeof children === 'string') ? children.split(' ') : children;
    return wordsArray.reduce((content, word, key) => {
        if (parsedUsernames(parsedUsers).find((username) => username === word)) {
            content.push(generateLink(key, `/${word.match(/@(\w+)/)[1]}`, word, linkClass));
            return content;
        }
        if (word.match(REGEX_HASHTAG)) {
            content.push(generateLink(key, `/hashtag/${word.match(REGEX_HASHTAG)[1]}`, word, linkClass));
            return content;
        }
        if (word.match(REGEX_URL)) {
            content.push(generateLink(key, word, word, linkClass));
            return content;
        }
        const lastWord = content[content.length - 1]
        if (typeof lastWord === 'string') {
            content.splice(content.length - 1, 1, `${lastWord} ${word}`);
            return content;
        }
        content.push(word);
        return content
    }, [])
}