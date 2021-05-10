function ToastMessage({type, message, handleClick}) {
    return (
        <>
            {message &&
            <div className={`toast-message toast-message-${type}`}>
                <div className="toast-message-bar">
                    <button
                        className="toast-message-btn"
                        onClick={handleClick}
                    >
                        Close
                    </button>
                </div>
                <span>{message}</span>
            </div>
            }
        </>
    )
}

export default ToastMessage;