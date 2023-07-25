function strToDate(str) {
    const date = new Date(str);
    
    const dateString = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

    const now = Date.now();
    const sec = (now - date) % 1000 % 60
    const min = Math.floor((now - date) / 1000 / 60)
    const hour = Math.floor(min / 60)
    const day = Math.floor(hour / 24)
    
    return (day && `${day}일 전`) || (hour && `${hour}시간 전`) || (min && `${min}분 전`) || (sec && '방금 전') || dateString;
}

export {strToDate};