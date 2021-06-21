import React from 'react';

const ContentParser = ({children}) => {
    const REGEX_URL = /(?:\s)(f|ht)tps?:\/\/([^\s\t\r\n<]*[^\s\t\r\n<)*_,\.])/g,
        REGEX_USER = /\B@([a-zA-Z0-9_]+)/g,
        REGEX_HASHTAG = /\B(#[Ã¡-ÃºÃ-ÃÃ¤-Ã¼Ã-Ãa-zA-Z0-9_]+)/g;
    const generateLink = (url, text) => {
        return `<a href="/${url}">${text}</a>`;
    }
    let content = children,
        searchlink = "hashtag/";
    content = content.replace(REGEX_URL, (url) => {
        const link = generateLink(url, url);
        return url.replace(url, link);
    });
    content = content.replace(REGEX_USER, (user) => {
        const userOnly = user.slice(1),
            url = `${userOnly}`,
            link = generateLink(url, user);
        return user.replace(user, link);
    });
    content = content.replace(REGEX_HASHTAG, (hashtag) => {
        const hashtagOnly = hashtag.slice(1),
            url = searchlink + hashtagOnly,
            link = generateLink(url, hashtag);
        return hashtag.replace(hashtag, link);
    });

    return (
        <div dangerouslySetInnerHTML={{__html: content}}>
        </div>
    );
}


export default ContentParser;
