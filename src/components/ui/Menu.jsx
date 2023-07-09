function Menu({data, config}) {
    const renderItems = data.map(item => {
        return (
            <li className="Menu__item" key={item.label}>
                {config.render(item)}
            </li>
        );
    });

    return (
        <ul className="Menu__list" style={config.horizontal && {display: 'flex', alignItems: 'center'}}>
            {renderItems}
        </ul>
    );
}

export default Menu;