function paramsToObject(paramsEntries) {
    const object = {};
    for (const [key, value] of paramsEntries) {
        object[key] = value;
    }

    return object;
}

export { paramsToObject };