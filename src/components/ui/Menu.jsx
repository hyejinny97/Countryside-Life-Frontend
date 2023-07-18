function Menu({data, config, className}) {
    const renderItems = data.map(item => {
        return (
            <li className="Menu__item" key={item.label}>
                {config.render(item)}
            </li>
        );
    });

    return (
        <ul className={`Menu__list ${className}`} style={config.horizontal && {display: 'flex', alignItems: 'center'}}>
            {renderItems}
        </ul>
    );
}

export default Menu;