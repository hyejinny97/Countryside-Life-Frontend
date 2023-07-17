function Page({ className , children }) {
    return (
        <div className="Page container">
            <div className={`${className} container__wrap`}>
                {children}
            </div>
        </div>
    );
}

export default Page;