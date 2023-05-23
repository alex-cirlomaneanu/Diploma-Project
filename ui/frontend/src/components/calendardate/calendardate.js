const getDate = (date) => {
    const localDate = new Date(date[0], date[1], date[2]);
    return new Intl.DateTimeFormat('ro-RO', {dateStyle: 'medium'}).format(localDate);
}

export default getDate;