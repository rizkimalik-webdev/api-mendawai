
const datetime = (datetime) => {
    return datetime.toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 16);
}

const isostring = (datetime) => {
    return datetime.toISOString().substring(0, 16);
}

module.exports = { datetime, isostring };
