
const datetime = (datetime) => {
    return datetime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

module.exports = datetime;
