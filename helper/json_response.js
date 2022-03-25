const logger = require('./logger');

const ok = function (res, data) {
    let values = {
        'status': 200,
        'message': 'success',
        'data': data
    }
    res.json(values);
    res.end();
}

const created = function (res, data) {
    let values = {
        'status': 201,
        'message': 'created',
        'data': data
    }
    res.json(values);
    res.end();
}

const error = function (res, data) {
    console.log(data);
    logger(path, data);

    let values = {
        'status': 400,
        'message': 'error',
        'data': data
    }
    res.json(values);
    res.status(500);
    res.end();
}

module.exports = { ok, created, error };