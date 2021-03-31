import {useState} from "react";

import styles from '../../styles/postForm.module.css';

function PostForm({
                      methodSendPost,
                      sendPost = {
                          username: '',
                          content: ''
                      }
                  }) {
    const [inputs, setInputs] = useState(sendPost);
    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        methodSendPost(inputs);
    }
    const handleInputChange = (event) => {
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }
    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form}
        >
            <label>Username</label>
            <input
                className={styles.input}
                name="username"
                onChange={handleInputChange}
                value={inputs.username}
                type="text"
                placeholder="Enter Username"
                required
            />
            <label>Post Content</label>
            <textarea
                className={styles.textarea}
                name="content"
                onChange={handleInputChange}
                value={inputs.content}
                rows="5"
                cols="30"
                placeholder="Enter post text"
                required
            />
            <button
                type="submit"
            >
                Save
            </button>
        </form>
    )
}

export default PostForm;
