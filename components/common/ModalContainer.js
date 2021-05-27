const ModalContainer = ({children}) => {
    return (
        <>
            <div className="modal-backdrop fade show"/>
            <div className="modal d-block">
                <button className="btn-close m-3" aria-label="Close"/>
                <div className="modal-dialog modal-dialog-centered">
                    {children}
                </div>
            </div>
        </>
    )
}

export default ModalContainer