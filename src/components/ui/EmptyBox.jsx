function EmptyBox({ message, icon }) {
    return (
        <div className="EmptyBox">
            <p className="EmptyBox__message">{message}</p>
            <span className="EmptyBox__icon">{icon}</span>           
        </div>
    );
}

export default EmptyBox;