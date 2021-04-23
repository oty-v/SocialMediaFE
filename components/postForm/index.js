import {useState} from "react";

import styles from '../../styles/postForm.module.css';

function PostForm({
                      onSubmit,
                      initialPost = {
                          content: ''
                      }
                  }) {
    const [inputsPost, setInputsPost] = useState(initialPost);
    const handleSubmit = async (event, post) => {
        if (event) {
            event.preventDefault();
        }
        console.log(post);
        onSubmit(post);
    }
    const handleInputChange = (key, value) => {
        setInputsPost(inputsPost => ({...inputsPost, [key]: value}));
    }
    return (
        <form
            onSubmit={(event) => handleSubmit(event, inputsPost)}
            className={styles.form}
        >
            <label>Post Content</label>
            <textarea
                className={styles.textarea}
                onChange={(event) => handleInputChange("content", event.target.value)}
                value={inputsPost.content}
                rows="5"
                cols="30"
                placeholder="Enter post text"
                required
            />
            <button type="submit">
                Save
            </button>
        </form>
    )
}

export default PostForm;
