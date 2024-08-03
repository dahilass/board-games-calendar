function createDate(item, month, year) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
    };

    if (!item || !month || !year) {
        return new Date().toLocaleDateString('ru', options);
    }

    return new Date(`${month}.${item}.${year}`);
}

export default createDate;
