const getDate = (date) => {
    const date1 = new Date(date);
    const day = date1.getDate();
    const month = date1.getMonth();
    const year = date1.getFullYear();
    return `${day}-${month}-${year}`;
}

export default getDate;