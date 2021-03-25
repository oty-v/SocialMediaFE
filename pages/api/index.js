export const pushPostData = (postData) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    };
    try {
        fetch('http://127.0.0.1:8000/api/posts/', requestOptions)
            .then(response => console.log(response))
            .then(window.location.reload())
    } catch (err) {
        console.log(err);
    }
};

export const editPostData = (postID,postData) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    };
    try {
    fetch(`http://127.0.0.1:8000/api/posts/${postID}`, requestOptions)
        .then(response => console.log(response))
        .then(window.location.reload())
    } catch (err) {
        console.log(err);
    }
};

export const removePostData = (postID) => {
    const requestOptions = {
        method: 'DELETE',
    };
    try {
    fetch(`http://127.0.0.1:8000/api/posts/${postID}`, requestOptions)
        .then(response => console.log(response))
        .then(window.location.reload())
    } catch (err) {
        console.log(err);
    }
};
