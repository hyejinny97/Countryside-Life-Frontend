function AccountBox({ children }) {
    return (
    <main className="AccountBox container">
        <div className="AccountBox__wrap container__wrap">
            {children}
        </div>
    </main>
    );
}

export default AccountBox;