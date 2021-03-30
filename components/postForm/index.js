import {useRouter} from 'next/router';
import {useState} from "react";

function PostForm({methodSendPost, sendPost={}}) {
    const router = useRouter()
    const [inputs, setInputs] = useState(sendPost);
    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        const res = await methodSendPost('/posts', inputs);
        if (!res.error) router.push('/posts');
    }
    const handleInputChange = (event) => {
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    name="username"
                    onChange={handleInputChange}
                    value={inputs.username}
                    type="text"
                    placeholder="Enter Username"
                    required
                />
                <label>Post Content</label>
                <textarea
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
            <style jsx>{`
                form {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                input, textarea {
                    margin: 1rem;
                }
            `}
            </style>
        </>
    )
}

export default PostForm;
