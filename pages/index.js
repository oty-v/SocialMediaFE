import { useState } from "react";
import { createPost } from "../api";
import PostForm from "../components/postForm";

export default function Home() {
    const [inputs, setInputs] = useState({});
    const useCreateForm = () => {
        const handleSubmit = (event) => {
            if (event) {
                event.preventDefault();
            }
            createPost(inputs);
        }
        const handleInputChange = (event) => {
            event.persist();
            setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
        }
        return {
            handleSubmit,
            handleInputChange,
            inputs
        };
    }
    return <PostForm sendPost={useCreateForm}/>
}