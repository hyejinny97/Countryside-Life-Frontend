function strToDate(str) {
    const date = new Date(str);
    
    const dateString = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;

    const now = Date.now();
    const min = Math.floor((now - date) / 1000 / 60)
    const hour = Math.floor(min / 60)
    const day = Math.floor(hour / 24)
    
    return (day && `${day}일 전`) || (hour && `${hour}시간 전`) || (min && `${min}분 전`) || dateString;
}

export {strToDate};