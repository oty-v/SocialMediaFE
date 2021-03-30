function PostForm({sendPost}) {
    const {inputs, handleInputChange, handleSubmit} = sendPost();

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
