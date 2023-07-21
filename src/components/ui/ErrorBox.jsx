function ErrorBox({ message, icon }) {
    return (
        <div className="ErrorBox">
            <p className="ErrorBox__message">{message}</p>
            <span className="ErrorBox__icon">{icon}</span>           
        </div>
    );
}

export default ErrorBox;